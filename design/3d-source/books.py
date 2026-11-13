"""Remedial pathway — a neat stack of three thick books (16:9). As in the reference: no cloud, soft shadow."""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S

S.reset_scene()


def book(w, d, h, z, cover, rot_deg=0.0, x=0.0, y=0.0, label=None):
    """Hardcover book: cover shell + cream page block inset on three sides."""
    c = S.add('cube', size=1, location=(x, y, z + h / 2))
    c.scale = (w, d, h)
    c.rotation_euler = (0, 0, math.radians(rot_deg))
    S.smooth(c, subdiv=0, bevel=0.06, segments=5)
    S.assign(c, S.mat(cover, rough=0.3, coat=0.7))
    p = S.add('cube', size=1, location=(x + 0.05 * math.cos(math.radians(rot_deg)), y - 0.05, z + h / 2))
    p.scale = (w * 0.96, d * 1.02, h * 0.74)
    p.rotation_euler = c.rotation_euler
    S.smooth(p, subdiv=0, bevel=0.02, segments=3)
    S.assign(p, S.mat('paper', rough=0.55, coat=0.1))
    # pages sit flush on the open side (front, -Y) and right side; cover spine stays at the back-left
    p.location.x += w * 0.03
    p.location.y -= d * 0.02
    if label:
        lb = S.add('cube', size=1, location=(x, y - d / 2 - 0.004, z + h / 2))
        lb.scale = (w * 0.32, 0.02, h * 0.42)
        lb.rotation_euler = c.rotation_euler
        S.smooth(lb, subdiv=0, bevel=0.012, segments=3)
        S.assign(lb, S.mat(label, rough=0.35, coat=0.5))
    return c


book(3.0, 2.1, 0.62, 0.0, 'blue_dark', rot_deg=-4)
book(2.75, 1.95, 0.56, 0.62, 'blue_light', rot_deg=5, x=0.08, y=0.02)
book(2.55, 1.8, 0.5, 1.18, 'gold', rot_deg=-8, x=-0.05, y=0.0, label='#FFD98A')

S.studio(target=(0, 0, 0.8), distance=19, elevation_deg=24, azimuth_deg=-30, lens=85)
S.render(S.out_path('/tmp/books.png'), 2048, 1152, samples=int(os.environ.get('SAMPLES', 64)))
