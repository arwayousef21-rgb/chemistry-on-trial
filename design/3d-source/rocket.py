"""Enrichment pathway — a cartoon rocket launching up and to the right with a cloud trail (16:9)."""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S

S.reset_scene()
import bpy
root = bpy.data.objects.new('rocket', None)
bpy.context.collection.objects.link(root)


def part(o):
    o.parent = root
    return o

body = part(S.add('sphere', radius=1, segments=64, ring_count=32, location=(0, 0, 0)))
body.scale = (0.62, 0.62, 1.45)
S.smooth(body, 1); S.assign(body, S.mat('white', rough=0.28, coat=0.8))
nose = part(S.add('sphere', radius=1, segments=64, ring_count=32, location=(0, 0, 1.05)))
nose.scale = (0.42, 0.42, 0.5)
S.smooth(nose, 1); S.assign(nose, S.mat('coral', rough=0.28, coat=0.8))
band = part(S.add('torus', major_radius=0.6, minor_radius=0.07, location=(0, 0, -0.55)))
S.smooth(band, 1); S.assign(band, S.mat('blue', rough=0.3, coat=0.7))
ring = part(S.add('torus', major_radius=0.27, minor_radius=0.06, location=(0, -0.6, 0.25), rotation=(math.radians(90), 0, 0)))
S.smooth(ring, 1); S.assign(ring, S.mat('blue_dark', rough=0.3, coat=0.7))
glass = part(S.add('sphere', radius=0.24, segments=48, ring_count=24, location=(0, -0.56, 0.25)))
glass.scale = (1, 0.45, 1)
S.smooth(glass, 1); S.assign(glass, S.mat('sky', rough=0.12, coat=1.0))
for k in range(4):
    # four rounded fins attached to the lower body; two read clearly from the side
    a = k * math.pi / 2 + math.radians(45)
    fin = part(S.add('cube', size=1, location=(0.58 * math.cos(a), 0.58 * math.sin(a), -0.92)))
    fin.scale = (0.42, 0.12, 0.72)
    fin.rotation_euler = (0, 0, a)
    S.smooth(fin, 2, bevel=0.05); S.assign(fin, S.mat('coral', rough=0.3, coat=0.8))
nozzle = part(S.add('cyl', radius=0.3, depth=0.22, vertices=48, location=(0, 0, -1.42)))
S.smooth(nozzle, 0, bevel=0.05); S.assign(nozzle, S.mat('#9AA7C2', rough=0.3, coat=0.5, metallic=0.4))
flame_o = part(S.add('sphere', radius=1, segments=48, ring_count=24, location=(0, 0, -2.05)))
flame_o.scale = (0.3, 0.3, 0.62)
S.smooth(flame_o, 1); S.assign(flame_o, S.mat('orange', rough=0.4, coat=0.2, emission=0.9))
flame_i = part(S.add('sphere', radius=1, segments=48, ring_count=24, location=(0, 0, -1.9)))
flame_i.scale = (0.17, 0.17, 0.42)
S.smooth(flame_i, 1); S.assign(flame_i, S.mat('gold', rough=0.4, coat=0.2, emission=1.4))

root.rotation_euler = (0, math.radians(38), 0)   # tilt: flying up and to the right
root.location = (0.55, 0, 1.35)

# small puffy trail under the rocket, lower left
S.cloud_base(center=(-1.55, 0.6, -0.95), width=2.4, depth=0.8, height=0.42,
             puffs=[(-1.0, 0, 0, 0.36), (-0.5, -0.1, 0.25, 0.48), (0.05, -0.1, 0.35, 0.52), (0.55, 0, 0.15, 0.42),
                    (0.95, 0.05, 0.0, 0.3), (-0.2, 0.25, 0.1, 0.4)])
S.studio(target=(0, 0, 0.6), distance=21, elevation_deg=10, azimuth_deg=-12, lens=85)
S.render(S.out_path('/tmp/rocket.png'), 2048, 1152, samples=int(os.environ.get('SAMPLES', 64)))
