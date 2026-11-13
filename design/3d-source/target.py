"""Corrective pathway — dartboard target with a blue dart on a cloud base (16:9)."""
import math, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import studio as S

S.reset_scene()
# Dartboard: stacked discs facing the camera (front = -Y), each slightly proud of the last.
rings = [(1.25, 'white', 0.32), (1.05, 'coral', 0.34), (0.83, 'white', 0.36), (0.6, 'coral', 0.38),
         (0.38, 'white', 0.40), (0.18, 'red', 0.42)]
board = []
for i, (r, col, depth) in enumerate(rings):
    d = S.add('cyl', radius=r, depth=depth, vertices=96, location=(0, -i * 0.012, 1.55),
              rotation=(math.radians(90), 0, 0))
    S.smooth(d, subdiv=0, bevel=0.035, segments=4)
    S.assign(d, S.mat(col, rough=0.3, coat=0.7))
    board.append(d)
rim = S.add('torus', major_radius=1.25, minor_radius=0.09, location=(0, 0, 1.55), rotation=(math.radians(90), 0, 0))
S.smooth(rim, subdiv=1); S.assign(rim, S.mat('white', rough=0.28, coat=0.8))

# Dart: comes from the upper right, tip in the bullseye.
tip_point = (0, -0.42, 1.55)
dart_dir = (0.55, -0.62, 0.56)
L = (sum(c * c for c in dart_dir)) ** 0.5
u = tuple(c / L for c in dart_dir)
from mathutils import Vector
dirv = Vector(u)
rot = dirv.to_track_quat('Z', 'Y').to_euler()
def along(t):
    return tuple(tip_point[i] + u[i] * t for i in range(3))
tip = S.add('cone', radius1=0.0, radius2=0.07, depth=0.32, vertices=48, location=along(0.12), rotation=rot)
S.smooth(tip, 0); S.assign(tip, S.mat('#C9D3E6', rough=0.2, coat=0.6, metallic=0.6))
barrel = S.add('cyl', radius=0.085, depth=0.5, vertices=48, location=along(0.5), rotation=rot)
S.smooth(barrel, 0, bevel=0.03); S.assign(barrel, S.mat('blue', rough=0.28, coat=0.8))
shaft = S.add('cyl', radius=0.045, depth=0.9, vertices=32, location=along(1.15), rotation=rot)
S.smooth(shaft, 0, bevel=0.015); S.assign(shaft, S.mat('blue_mid', rough=0.3, coat=0.7))
for k in range(3):
    fin = S.add('cube', size=1, location=along(1.55))
    fin.scale = (0.02, 0.26, 0.42)
    fin.rotation_mode = 'QUATERNION'
    from mathutils import Quaternion
    fin.rotation_quaternion = dirv.to_track_quat('Z', 'Y') @ Quaternion((0, 0, 1), k * 2 * math.pi / 3) @ Quaternion((0, 1, 0), 0) 
    S.smooth(fin, 1, bevel=0.01); S.assign(fin, S.mat('navy', rough=0.35, coat=0.6))

S.cloud_base(center=(0, 0.15, 0.1), width=3.6, depth=1.0, height=0.55)
S.studio(target=(0, 0, 1.2), distance=19, elevation_deg=12, azimuth_deg=-18, lens=85)
S.render(S.out_path('/tmp/target.png'), 2048, 1152, samples=int(os.environ.get('SAMPLES', 64)))
