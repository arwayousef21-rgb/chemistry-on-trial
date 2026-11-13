"""Decorative science elements — mint leaves with small floating molecules and sparkles (2:3 portrait)."""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S

S.reset_scene()
leaf_mat = S.mat('mint', rough=0.35, coat=0.6)
leaf_dark = S.mat('#6FBFA8', rough=0.35, coat=0.6)
stem = S.add('cyl', radius=0.04, depth=2.2, vertices=24, location=(0, 0, 1.1), rotation=(0, math.radians(-6), 0))
S.smooth(stem, 1); S.assign(stem, leaf_dark)
for (z, side, ang, size, m) in [(0.6, -1, 55, 0.95, leaf_mat), (1.15, 1, -50, 0.85, leaf_dark), (1.7, -1, 40, 0.72, leaf_mat), (2.2, 0, 0, 0.55, leaf_dark)]:
    l = S.add('sphere', radius=1, segments=48, ring_count=24, location=(side * 0.38 * size, 0, z + 0.2 * size))
    l.scale = (0.32 * size, 0.08, 0.62 * size)
    l.rotation_euler = (0, math.radians(ang), 0)
    S.smooth(l, 1); S.assign(l, m)

# small ball-and-stick molecules (decorative only — not a specific reaction)
def molecule(center, r=0.16, color_a='blue_mid', color_b='white'):
    a = S.add('sphere', radius=r, segments=32, ring_count=16, location=center)
    S.smooth(a, 1); S.assign(a, S.mat(color_a, rough=0.25, coat=0.9))
    for dx, dz in [(0.32, 0.18), (-0.3, 0.2)]:
        b = S.add('sphere', radius=r * 0.65, segments=32, ring_count=16, location=(center[0] + dx, center[1], center[2] + dz))
        S.smooth(b, 1); S.assign(b, S.mat(color_b, rough=0.25, coat=0.9))
        s = S.add('cyl', radius=r * 0.18, depth=0.3, vertices=16, location=(center[0] + dx / 2, center[1], center[2] + dz / 2),
                  rotation=(0, math.atan2(dx, dz), 0))
        S.smooth(s, 0); S.assign(s, S.mat('#DCE6F5', rough=0.3, coat=0.5))

molecule((0.75, -0.1, 2.45))
molecule((-0.7, -0.1, 3.05), r=0.13, color_a='coral')
S.four_point_star((0.85, -0.2, 3.3), size=0.2)
S.four_point_star((-0.85, -0.2, 1.55), size=0.15)

S.studio(target=(0, 0, 1.8), distance=19, elevation_deg=8, azimuth_deg=-10, lens=85)
S.render(S.out_path('/tmp/decor.png'), 1365, 2048, samples=int(os.environ.get('SAMPLES', 64)))
