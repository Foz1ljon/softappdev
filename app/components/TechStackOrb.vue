<script setup lang="ts">
import * as THREE from 'three'

/**
 * Tech stack orb: a wireframe shell with one node per tool in the selected
 * category. Switching category recolours the shell and re-pulses the nodes, so
 * the visual is tied to the matrix the visitor is browsing.
 */
const props = withDefaults(defineProps<{
  /** Id of the active category — used to re-pulse on change. */
  activeId: string
  /** Number of tools in the active category. */
  count?: number
  /** Accent colour of the active category. */
  color: number
}>(), {
  count: 5
})

const canvas = ref<HTMLCanvasElement>()

let shell: THREE.Mesh | null = null
let core: THREE.Mesh | null = null
let keyLight: THREE.PointLight | null = null
const nodes: THREE.Mesh[] = []

useThreeScene(canvas, {
  fov: 55,
  cameraZ: 6.2,
  narrowDistance: 1.4,
  build: ({ scene }) => {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    keyLight = new THREE.PointLight(props.color, 3, 20)
    keyLight.position.set(3, 3, 5)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x818cf8, 2, 20)
    fillLight.position.set(-4, -2, 3)
    scene.add(fillLight)

    const root = new THREE.Group()
    root.rotation.x = 0.35
    scene.add(root)

    // ── Wireframe shell ──
    shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 2),
      new THREE.MeshPhongMaterial({
        color: props.color,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        shininess: 60
      })
    )
    root.add(shell)

    // ── Inner core ──
    core = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 32),
      new THREE.MeshPhongMaterial({
        color: props.color,
        transparent: true,
        opacity: 0.5,
        emissive: props.color,
        emissiveIntensity: 0.5,
        shininess: 200
      })
    )
    root.add(core)

    // ── One node per tool, spread on a Fibonacci sphere ──
    const total = Math.max(props.count, 1)
    for (let i = 0; i < total; i++) {
      const y = total === 1 ? 0 : 1 - (i / (total - 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(1 - y * y, 0))
      const theta = i * Math.PI * (3 - Math.sqrt(5))
      const radius = 1.95
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.17, 0),
        new THREE.MeshPhongMaterial({
          color: props.color,
          transparent: true,
          opacity: 0.95,
          emissive: props.color,
          emissiveIntensity: 0.4,
          shininess: 160
        })
      )
      node.position.set(Math.cos(theta) * radiusAtY * radius, y * radius, Math.sin(theta) * radiusAtY * radius)
      root.add(node)
      nodes.push(node)
    }

    // ── Orbit ring ──
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.008, 8, 96),
      new THREE.MeshBasicMaterial({ color: props.color, transparent: true, opacity: 0.3 })
    )
    ring.rotation.x = Math.PI / 2.4
    root.add(ring)

    return ({ elapsed, pointer }) => {
      root.rotation.y = elapsed * 0.14 + pointer.x * 0.4
      root.rotation.x = 0.35 + Math.sin(elapsed * 0.25) * 0.08 + pointer.y * 0.2
      shell!.rotation.y = -elapsed * 0.06

      nodes.forEach((node, i) => {
        node.scale.setScalar(1 + Math.sin(elapsed * 1.6 + i * 0.9) * 0.16)
        node.rotation.y = elapsed * 0.6
        node.rotation.z = elapsed * 0.4
      })

      ring.rotation.z = elapsed * 0.3

      keyLight!.position.x = Math.sin(elapsed * 0.5) * 3.4
      keyLight!.position.y = Math.cos(elapsed * 0.4) * 2.8
    }
  }
})

function recolor(mesh: THREE.Mesh | null, color: number, emissive = false) {
  if (!mesh) {
    return
  }
  const material = mesh.material as THREE.MeshPhongMaterial
  material.color.setHex(color)
  if (emissive) {
    material.emissive.setHex(color)
  }
}

/** Recolour the scene in place when the visitor switches category. */
watch(() => props.activeId, () => {
  const color = props.color
  recolor(shell, color)
  recolor(core, color, true)
  nodes.forEach((node) => {
    recolor(node, color, true)
  })
  keyLight?.color.setHex(color)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
