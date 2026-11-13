"""
Shared Blender "studio" for the Chemistry on Trial 3D assets.

Every asset script imports this module so that all six assets share the same
lighting, camera style, materials and render settings
(design/3d-illustration-style-guide.md §2):
  - soft key light from the upper left, gentle fill from the right, rim light
  - glossy plastic / ceramic materials with a clear-coat highlight
  - three-quarter view slightly from above, long lens (toy-like perspective)
  - transparent background, soft contact shadow (shadow catcher)
  - sRGB output with the "Standard" view transform so palette colours stay true

Run with Blender's Python module (bpy 5.1.2):  python <asset_script>.py <out.png>
"""
import math
import sys

import bpy
from mathutils import Vector

PALETTE = {
    'navy': '#183660', 'blue_dark': '#1866B4', 'blue': '#186CC0', 'blue_mid': '#3C98F0',
    'blue_light': '#58B0F4', 'sky': '#9CD0FC', 'cloud': '#E4F0FF', 'green': '#00845A',
    'green_check': '#08A074', 'mint': '#94D0C0', 'purple': '#784EAE', 'purple_dark': '#6C4890',
    'gold': '#FCBC40', 'coral': '#E84C58', 'red': '#C03030', 'pink': '#F080B0',
    'white': '#F7F9FF', 'cyan': '#4CECF8', 'orange': '#F79A3E', 'paper': '#FFF8EA',
}


def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgba(h: str, alpha: float = 1.0):
    h = PALETTE.get(h, h).lstrip('#')
    return tuple(srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (alpha,)


_materials = {}


def mat(color: str, rough: float = 0.32, coat: float = 0.6, metallic: float = 0.0,
        emission: float = 0.0, transmission: float = 0.0, name: str | None = None):
    """Glossy toy-like material from a palette name or hex colour."""
    key = (color, rough, coat, metallic, emission, transmission)
    if key in _materials:
        return _materials[key]
    m = bpy.data.materials.new(name or f'm_{color}_{len(_materials)}')
    m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = hex_rgba(color)
    p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metallic
    p.inputs['Coat Weight'].default_value = coat
    p.inputs['Coat Roughness'].default_value = 0.12
    if transmission:
        p.inputs['Transmission Weight'].default_value = transmission
        p.inputs['IOR'].default_value = 1.45
    if emission:
        p.inputs['Emission Color'].default_value = hex_rgba(color)
        p.inputs['Emission Strength'].default_value = emission
    _materials[key] = m
    return m


def assign(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)
    return obj


def smooth(obj, subdiv: int = 2, bevel: float = 0.0, segments: int = 4):
    """Rounded, soft shapes: optional bevel then subdivision + smooth shading."""
    bpy.context.view_layer.objects.active = obj
    if bevel:
        b = obj.modifiers.new('bevel', 'BEVEL')
        b.width = bevel
        b.segments = segments
        b.limit_method = 'ANGLE'
    if subdiv:
        s = obj.modifiers.new('subd', 'SUBSURF')
        s.levels = subdiv
        s.render_levels = subdiv
    for poly in obj.data.polygons:
        poly.use_smooth = True
    return obj


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    _materials.clear()


def add(kind: str, **kw):
    ops = {
        'cube': bpy.ops.mesh.primitive_cube_add,
        'sphere': bpy.ops.mesh.primitive_uv_sphere_add,
        'ico': bpy.ops.mesh.primitive_ico_sphere_add,
        'cyl': bpy.ops.mesh.primitive_cylinder_add,
        'cone': bpy.ops.mesh.primitive_cone_add,
        'torus': bpy.ops.mesh.primitive_torus_add,
    }
    ops[kind](**kw)
    return bpy.context.active_object


def cloud_base(center=(0, 0, 0), width=3.0, depth=1.0, height=0.6, puffs=None, back_tint='sky'):
    """Soft puffy cloud made of merged metaballs (as under the target and rocket in the reference).

    A white front layer sits on a slightly bluer back layer, giving the soft
    blue undertone seen in the reference clouds.
    """
    puffs = puffs or [(-1.05, 0.0, 0.0, 0.40), (-0.65, -0.12, 0.25, 0.55), (-0.15, -0.18, 0.45, 0.66),
                      (0.38, -0.15, 0.32, 0.6), (0.82, -0.05, 0.12, 0.46), (1.1, 0.05, -0.02, 0.34),
                      (-0.35, 0.25, 0.2, 0.5), (0.42, 0.28, 0.18, 0.52)]
    objs = []
    for layer, (dy, tint, scale) in enumerate([(0.0, 'white', 1.0), (0.35, back_tint, 0.92)]):
        mb = bpy.data.metaballs.new(f'cloud{layer}')
        mb.resolution = 0.06
        mb.render_resolution = 0.03
        mb.threshold = 0.6
        for x, y, z, r in puffs:
            el = mb.elements.new()
            el.co = (x * width / 2.2, y * depth + dy, z * height / 0.6 + (0.18 if layer else 0))
            el.radius = r * 1.55 * scale
            el.stiffness = 1.6
        o = bpy.data.objects.new(f'cloud{layer}', mb)
        bpy.context.collection.objects.link(o)
        o.location = center
        o.scale = (1.0, 1.0, height / 0.6 * 0.95)
        o.data.materials.append(mat(tint if layer == 0 else back_tint, rough=0.5, coat=0.2))
        objs.append(o)
    # Lower front puffs pick up the sky blue at the base
    return objs


def four_point_star(location, size=0.25, color='gold', rotation=(math.radians(90), 0, 0)):
    """Small glossy 3D sparkle."""
    import bmesh
    me = bpy.data.meshes.new('star')
    bm = bmesh.new()
    pts = []
    for i in range(8):
        ang = i * math.pi / 4
        r = size if i % 2 == 0 else size * 0.28
        pts.append(bm.verts.new((r * math.cos(ang), r * math.sin(ang), 0)))
    f = bm.faces.new(pts)
    ext = bmesh.ops.extrude_face_region(bm, geom=[f])
    verts = [e for e in ext['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=Vector((0, 0, size * 0.18)), verts=verts)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new('star', me)
    bpy.context.collection.objects.link(o)
    o.location = location
    o.rotation_euler = rotation
    smooth(o, subdiv=1, bevel=size * 0.06, segments=3)
    assign(o, mat(color, rough=0.25, coat=0.8, emission=0.25))
    return o


def shadow_catcher(z=0.0, size=6.0, center=(0, 0)):
    """Invisible floor that only receives the soft contact shadow (kept compact)."""
    o = add('cube', size=1, location=(center[0], center[1], z - 0.005))
    o.scale = (size, size, 0.01)
    o.is_shadow_catcher = True
    assign(o, mat('#ffffff', rough=1, coat=0))
    return o


def studio(target=(0, 0, 0.6), distance=11.0, elevation_deg=20.0, azimuth_deg=-28.0,
           lens=85.0, ortho_scale: float | None = None):
    """Camera + three-point soft lighting shared by every asset."""
    scene = bpy.context.scene
    world = bpy.data.worlds.new('world')
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = hex_rgba('#EAF2FF')
    bg.inputs['Strength'].default_value = 0.35

    t = Vector(target)
    el, az = math.radians(elevation_deg), math.radians(azimuth_deg)
    cam_pos = t + Vector((distance * math.cos(el) * math.sin(az), -distance * math.cos(el) * math.cos(az),
                          distance * math.sin(el)))
    cam_data = bpy.data.cameras.new('cam')
    if ortho_scale:
        cam_data.type = 'ORTHO'
        cam_data.ortho_scale = ortho_scale
    else:
        cam_data.lens = lens
    cam = bpy.data.objects.new('cam', cam_data)
    scene.collection.objects.link(cam)
    cam.location = cam_pos
    cam.rotation_euler = (t - cam_pos).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam

    def area(name, loc, energy, size, color='#FFFFFF'):
        ld = bpy.data.lights.new(name, 'AREA')
        ld.energy = energy
        ld.size = size
        ld.color = hex_rgba(color)[:3]
        lo = bpy.data.objects.new(name, ld)
        scene.collection.objects.link(lo)
        lo.location = loc
        lo.rotation_euler = (t - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
        return lo

    # Key: upper left (viewer's left, in front, above). Fill: right. Rim: behind.
    area('key', t + Vector((-6, -5, 7)), 700, 6, '#FFF6EC')
    area('fill', t + Vector((7, -4, 3)), 220, 7, '#EAF2FF')
    area('rim', t + Vector((2, 7, 5)), 380, 5, '#FFFFFF')
    return cam


def render(path: str, width: int, height: int, samples: int = 64):
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.render.film_transparent = True
    scene.cycles.film_transparent_glass = True  # glass shows the page behind it
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.image_settings.color_depth = '8'
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.look = 'None'
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)


def out_path(default: str) -> str:
    return sys.argv[1] if len(sys.argv) > 1 else default
