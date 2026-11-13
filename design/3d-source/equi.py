"""EQUI robot mascot — pointing to the viewer's right (toward the speech bubble in the Arabic layout) (1:1).

Spec: design/3d-illustration-style-guide.md §3 — glossy white rounded body, navy
visor with cyan oval eyes and a small cyan smile, blue headphones, blue chest
panel and joints, friendly and gender-neutral, head ≈ 45 % of total height.
"""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S
import bpy

S.reset_scene()
WHITE = S.mat('white', rough=0.26, coat=0.85)
BLUE = S.mat('#2472D2', rough=0.28, coat=0.8)
BLUE_L = S.mat('blue_mid', rough=0.28, coat=0.8)
NAVY = S.mat('navy', rough=0.12, coat=1.0)
CYAN = S.mat('cyan', rough=0.2, coat=0.5, emission=3.0)


def capsule(p1, p2, r, material, name='capsule'):
    """Rounded limb between two points."""
    from mathutils import Vector
    a, b = Vector(p1), Vector(p2)
    mid, d = (a + b) / 2, b - a
    c = S.add('cyl', radius=r, depth=d.length, vertices=32, location=mid)
    c.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
    S.smooth(c, 0); S.assign(c, material)
    for p in (a, b):
        s = S.add('sphere', radius=r, segments=32, ring_count=16, location=p)
        S.smooth(s, 1); S.assign(s, material)
    return c

# --- head (≈45 % of height) ---
head = S.add('sphere', radius=1, segments=64, ring_count=32, location=(0, 0, 3.05))
head.scale = (1.18, 1.0, 0.98)
S.smooth(head, 1); S.assign(head, WHITE)
visor = S.add('sphere', radius=1, segments=64, ring_count=32, location=(0, -0.42, 3.02))
visor.scale = (0.95, 0.62, 0.7)
S.smooth(visor, 1); S.assign(visor, NAVY)
for x in (-0.36, 0.36):
    e = S.add('sphere', radius=1, segments=32, ring_count=16, location=(x, -1.0, 3.12))
    e.scale = (0.15, 0.06, 0.22)
    S.smooth(e, 1); S.assign(e, CYAN)
# smile: a short arc (torus segment) under the eyes
smile = S.add('torus', major_radius=0.22, minor_radius=0.035, major_segments=48, minor_segments=12,
              location=(0, -1.02, 2.92), rotation=(math.radians(90), 0, 0))
cutter = S.add('cube', size=1, location=(0, -1.02, 3.07)); cutter.scale = (1, 1, 0.3)
m = smile.modifiers.new('cut', 'BOOLEAN'); m.object = cutter; m.operation = 'DIFFERENCE'; cutter.hide_render = True
S.assign(smile, CYAN)
# headphones: ear cups + band
for x in (-1.2, 1.2):
    cup = S.add('cyl', radius=0.36, depth=0.32, vertices=48, location=(x, 0, 3.05), rotation=(0, math.radians(90), 0))
    S.smooth(cup, 0, bevel=0.1, segments=5); S.assign(cup, BLUE)
    pad = S.add('cyl', radius=0.22, depth=0.12, vertices=48, location=(x * 1.12, 0, 3.05), rotation=(0, math.radians(90), 0))
    S.smooth(pad, 0, bevel=0.04); S.assign(pad, BLUE_L)
band = S.add('torus', major_radius=1.22, minor_radius=0.085, major_segments=64, location=(0, 0.05, 3.1), rotation=(math.radians(90), 0, 0))
bcut = S.add('cube', size=1, location=(0, 0.05, 2.35)); bcut.scale = (4, 4, 1.5)
m = band.modifiers.new('cut', 'BOOLEAN'); m.object = bcut; m.operation = 'DIFFERENCE'; bcut.hide_render = True
S.smooth(band, 0); S.assign(band, BLUE)

# --- neck + body ---
neck = S.add('cyl', radius=0.28, depth=0.25, vertices=32, location=(0, 0, 2.02))
S.smooth(neck, 0, bevel=0.05); S.assign(neck, BLUE)
body = S.add('sphere', radius=1, segments=64, ring_count=32, location=(0, 0, 1.25))
body.scale = (0.82, 0.68, 0.82)
S.smooth(body, 1); S.assign(body, WHITE)
panel = S.add('cube', size=1, location=(0, -0.62, 1.3))
panel.scale = (0.62, 0.1, 0.46)
S.smooth(panel, 1, bevel=0.06); S.assign(panel, BLUE)
light = S.add('sphere', radius=0.09, segments=24, ring_count=12, location=(0, -0.72, 1.32))
S.smooth(light, 1); S.assign(light, CYAN)

# --- arms: viewer's right arm raised, pointing right; viewer's left arm relaxed ---
shoulder_r, shoulder_l = (0.82, -0.05, 1.6), (-0.82, -0.05, 1.6)
for s in (shoulder_r, shoulder_l):
    j = S.add('sphere', radius=0.2, segments=32, ring_count=16, location=s)
    S.smooth(j, 1); S.assign(j, BLUE)
elbow_r = (1.35, -0.25, 2.0)
hand_r = (1.85, -0.35, 2.35)
capsule(shoulder_r, elbow_r, 0.16, WHITE)
capsule(elbow_r, hand_r, 0.15, WHITE)
fist = S.add('sphere', radius=0.22, segments=32, ring_count=16, location=hand_r)
S.smooth(fist, 1); S.assign(fist, WHITE)
capsule((hand_r[0] + 0.12, hand_r[1] - 0.05, hand_r[2] + 0.1), (hand_r[0] + 0.42, hand_r[1] - 0.08, hand_r[2] + 0.32), 0.07, WHITE)  # index finger
elbow_l, hand_l = (-1.12, -0.12, 1.05), (-1.05, -0.2, 0.62)
capsule(shoulder_l, elbow_l, 0.16, WHITE)
capsule(elbow_l, hand_l, 0.15, WHITE)
fl = S.add('sphere', radius=0.21, segments=32, ring_count=16, location=hand_l)
S.smooth(fl, 1); S.assign(fl, WHITE)

# --- legs and feet ---
for x in (-0.38, 0.38):
    capsule((x, 0, 0.62), (x, -0.02, 0.28), 0.17, WHITE)
    foot = S.add('sphere', radius=1, segments=32, ring_count=16, location=(x, -0.12, 0.13))
    foot.scale = (0.26, 0.36, 0.14)
    S.smooth(foot, 1); S.assign(foot, BLUE)

S.studio(target=(0.25, 0, 1.9), distance=21, elevation_deg=8, azimuth_deg=-14, lens=85)
S.render(S.out_path('/tmp/equi.png'), 2048, 2048, samples=int(os.environ.get('SAMPLES', 64)))
