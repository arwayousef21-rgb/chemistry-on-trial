"""Laboratory glassware — blue Erlenmeyer flask and pink round-bottom flask (decorative, no experiment) (3:2)."""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S
import bpy

S.reset_scene()


def lathe(profile, location, name, material, subdiv=1):
    """Spin a 2D (r, z) profile around Z to make a round glass vessel."""
    import bmesh
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    verts = [bm.verts.new((r, 0, z)) for r, z in profile]
    for a, b in zip(verts, verts[1:]):
        bm.edges.new((a, b))
    bmesh.ops.spin(bm, geom=bm.verts[:] + bm.edges[:], axis=(0, 0, 1), cent=(0, 0, 0), steps=64, angle=math.radians(360))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    o.location = location
    S.smooth(o, subdiv=subdiv)
    S.assign(o, material)
    return o

glass = S.mat('#F2F8FF', rough=0.04, coat=0.3, transmission=1.0)
rim = S.mat('#DCEBFF', rough=0.1, coat=0.6)

# Erlenmeyer flask (larger, blue liquid)
erl = [(0.001, 0.0), (1.05, 0.0), (1.12, 0.06), (1.1, 0.16), (0.42, 1.55), (0.33, 1.75), (0.33, 2.45), (0.38, 2.52), (0.38, 2.58), (0.30, 2.58)]
lathe(erl, (-0.85, 0, 0), 'erlenmeyer', glass)
liq_e = [(0.001, 0.06), (1.0, 0.06), (1.05, 0.12), (0.62, 1.0), (0.001, 1.0)]
lathe(liq_e, (-0.85, 0, 0), 'liquid_e', S.mat('blue_light', rough=0.15, coat=0.9, emission=0.1), subdiv=0)
lip = S.add('torus', major_radius=0.36, minor_radius=0.045, location=(-0.85, 0, 2.55))
S.smooth(lip, 1); S.assign(lip, rim)

# Round-bottom flask (smaller, pink liquid), slightly in front and to the right
rb_c = (0.95, -0.45, 0)
sph = S.add('sphere', radius=0.78, segments=64, ring_count=32, location=(rb_c[0], rb_c[1], 0.8))
S.smooth(sph, 1); S.assign(sph, glass)
neck = S.add('cyl', radius=0.2, depth=0.85, vertices=48, location=(rb_c[0], rb_c[1], 1.85))
S.smooth(neck, 1); S.assign(neck, glass)
lip2 = S.add('torus', major_radius=0.22, minor_radius=0.04, location=(rb_c[0], rb_c[1], 2.27))
S.smooth(lip2, 1); S.assign(lip2, rim)
liq_r = S.add('sphere', radius=0.7, segments=64, ring_count=32, location=(rb_c[0], rb_c[1], 0.8))
S.smooth(liq_r, 1); S.assign(liq_r, S.mat('#F58DBB', rough=0.15, coat=0.9, emission=0.35))
# cut the pink liquid to a flat surface with a boolean
cut = S.add('cube', size=1, location=(rb_c[0], rb_c[1], 0.8 + 0.12 + 0.75))
cut.scale = (2, 2, 1.5)
mod = liq_r.modifiers.new('cut', 'BOOLEAN'); mod.object = cut; mod.operation = 'DIFFERENCE'
cut.hide_render = True
# a few bubbles
for (x, y, z, r) in [(-0.95, -0.55, 0.55, 0.07), (-0.7, -0.6, 0.35, 0.05), (-1.1, -0.5, 0.25, 0.045),
                     (0.85, -1.05, 0.7, 0.055), (1.05, -1.0, 0.5, 0.04)]:
    b = S.add('sphere', radius=r, segments=24, ring_count=12, location=(x, y, z))
    S.smooth(b, 1); S.assign(b, S.mat('#FFFFFF', rough=0.1, coat=1.0))

S.studio(target=(0.0, 0, 1.15), distance=19, elevation_deg=14, azimuth_deg=-14, lens=85)
S.render(S.out_path('/tmp/glassware.png'), 2048, 1365, samples=int(os.environ.get('SAMPLES', 96)))
