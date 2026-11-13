"""
Post-process a raw Blender render into a delivery master and web exports.

  python3 finalize.py <raw.png> <asset-id>

- crops to the visible object, then fits it into the exact master canvas from
  src/assets/illustrations.ts with ~9 % transparent margin, resting on the
  bottom margin (the rocket is centred instead)
- adds a soft contact shadow (blurred ellipse) under grounded objects
- embeds an sRGB ICC profile
- writes:  design/3d-source/masters/<name>.png             (master, 8-bit RGBA)
           public/assets/illustrations/<file>.webp          (display size × 1)
           public/assets/illustrations/<file>@2x.webp       (× 2)
           public/assets/illustrations/<file>.png           (× 2 fallback)
"""
import os
import sys

from PIL import Image, ImageCms, ImageDraw, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

SPECS = {
    # id: (file, master W, H, display W, H, grounded, margin)
    'equi-robot': ('robot/equi-pointing', 2048, 2048, 180, 180, True, 0.08),
    'remedial-books': ('pathways/remedial-books', 2048, 1152, 250, 141, True, 0.09),
    'corrective-target': ('pathways/corrective-target', 2048, 1152, 250, 141, True, 0.09),
    'enrichment-rocket': ('pathways/enrichment-rocket', 2048, 1152, 250, 141, False, 0.09),
    'lab-glassware': ('chemistry/lab-glassware', 2048, 1365, 200, 133, True, 0.09),
    'science-decor': ('ui/science-decor', 1365, 2048, 80, 120, False, 0.09),
}

SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()


def fit(raw: Image.Image, W: int, H: int, grounded: bool, margin: float) -> Image.Image:
    alpha = raw.getchannel('A').point(lambda a: 255 if a > 12 else 0)
    obj = raw.crop(alpha.getbbox())
    mx, my = int(W * margin), int(H * margin)
    scale = min((W - 2 * mx) / obj.width, (H - 2 * my) / obj.height)
    obj = obj.resize((round(obj.width * scale), round(obj.height * scale)), Image.LANCZOS)
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    x = (W - obj.width) // 2
    y = H - my - obj.height if grounded else (H - obj.height) // 2
    if grounded:
        # soft contact shadow, navy-tinted, slightly narrower than the object
        sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(sh)
        sw, shh = obj.width * 0.78, max(H * 0.035, obj.height * 0.06)
        cx, cy = W / 2, H - my - shh * 0.15
        d.ellipse([cx - sw / 2, cy - shh / 2, cx + sw / 2, cy + shh / 2], fill=(24, 54, 96, 60))
        sh = sh.filter(ImageFilter.GaussianBlur(radius=H * 0.018))
        canvas.alpha_composite(sh)
    canvas.alpha_composite(obj, (x, y))
    return canvas


def main(raw_path: str, asset: str):
    file, W, H, dw, dh, grounded, margin = SPECS[asset]
    raw = Image.open(raw_path).convert('RGBA')
    master = fit(raw, W, H, grounded, margin)
    name = os.path.basename(file)
    mdir = os.path.join(ROOT, 'design', '3d-source', 'masters')
    os.makedirs(mdir, exist_ok=True)
    master.save(os.path.join(mdir, f'{name}.png'), icc_profile=SRGB, optimize=True)
    out = os.path.join(ROOT, 'public', 'assets', 'illustrations', file)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    one = master.resize((dw, dh), Image.LANCZOS)
    two = master.resize((dw * 2, dh * 2), Image.LANCZOS)
    one.save(out + '.webp', 'WEBP', quality=90, method=6, icc_profile=SRGB)
    two.save(out + '@2x.webp', 'WEBP', quality=90, method=6, icc_profile=SRGB)
    two.save(out + '.png', icc_profile=SRGB, optimize=True)
    print(asset, 'master', master.size, '→', out)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
