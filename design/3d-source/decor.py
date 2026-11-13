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

# Abstract, scientifically neutral molecular shapes (decorative only).
# - Irregular, non-planar branching that matches no common real molecule.
# - Palette colours (lavender, gold, sky, mint) instead of the standard CPK element
#   colours, so no atom reads as a specific element.
def node(loc, r, color):
    o = S.add('sphere', radius=r, segments=32, ring_count=16, location=loc)
    S.smooth(o, 1); S.assign(o, S.mat(color, rough=0.25, coat=0.9))
    return o


def bond(p, q, r=0.028):
    from mathutils import Vector
    a, b = Vector(p), Vector(q)
    c = S.add('cyl', radius=r, depth=(b - a).length, vertices=16, location=(a + b) / 2)
    c.rotation_euler = (b - a).to_track_quat('Z', 'Y').to_euler()
    S.smooth(c, 0); S.assign(c, S.mat('#DCE6F5', rough=0.3, coat=0.5))


def abstract_molecule(center, nodes):
    """nodes: list of (offset, radius, colour, parent_index or None)."""
    from mathutils import Vector
    pts = []
    for off, r, col, parent in nodes:
        p = Vector(center) + Vector(off)
        node(p, r, col)
        if parent is not None:
            bond(pts[parent], p)
        pts.append(p)

# Molecule A — irregular branched cluster: hub with three unequal arms, one arm extended.
abstract_molecule((0.72, -0.1, 2.45), [
    ((0, 0, 0), 0.15, 'purple', None),
    ((0.3, -0.08, 0.2), 0.1, 'gold', 0),
    ((-0.24, 0.1, 0.26), 0.12, 'blue_light', 0),
    ((0.05, -0.12, -0.3), 0.09, 'mint', 0),
    ((0.52, 0.05, 0.42), 0.075, 'blue_light', 1),
])
# Molecule B — short zig-zag chain of four unequal nodes, twisted out of plane.
abstract_molecule((-0.72, -0.1, 3.0), [
    ((-0.28, 0, -0.1), 0.085, 'gold', None),
    ((-0.06, -0.1, 0.12), 0.12, 'blue_light', 0),
    ((0.2, 0.08, 0.02), 0.1, 'purple', 1),
    ((0.4, -0.06, 0.24), 0.075, 'mint', 2),
])
S.four_point_star((0.85, -0.2, 3.3), size=0.2)
S.four_point_star((-0.85, -0.2, 1.55), size=0.15)

S.studio(target=(0, 0, 1.8), distance=19, elevation_deg=8, azimuth_deg=-10, lens=85)
S.render(S.out_path('/tmp/decor.png'), 1365, 2048, samples=int(os.environ.get('SAMPLES', 64)))
