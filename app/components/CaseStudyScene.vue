<script setup lang="ts">
import * as THREE from 'three'

/**
 * Case study scene: the order core in the middle, the four products orbiting
 * it and the carrier adapters on the outer ring. Selecting a product tab
 * highlights its node, so the visual doubles as an architecture map.
 */
const props = defineProps<{
  /** Id of the currently selected product, e.g. `courier-terminal`. */
  activeId?: string
}>()

const canvas = ref<HTMLCanvasElement>()

interface OrbitNode {
  id: string
  radius: number
  speed: number
  height: number
  group: THREE.Group
  glow: THREE.MeshBasicMaterial
  currentScale: number
}

const productNodes = [
  { id: 'mobile-app', color: 0x818cf8 },
  { id: 'courier-terminal', color: 0x34d399 },
  { id: 'admin-dashboard', color: 0x22d3ee },
  { id: 'backend', color: 0xfbbf24 }
]
const carrierNodes = [
  { id: 'uzpost', color: 0xa78bfa },
  { id: 'bts-express', color: 0x38bdf8 },
  { id: 'own-fleet', color: 0x4ade80 }
]

const nodeScales = reactive<Record<string, number>>({})

function createDotTexture() {
  const element = document.createElement('canvas')
  element.width = 64
  element.height = 64
  const ctx = element.getContext('2d')!
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  const texture = new THREE.CanvasTexture(element)
  texture.needsUpdate = true
  return texture
}

watch(() => props.activeId, (id) => {
  for (const key of Object.keys(nodeScales)) {
    nodeScales[key] = key === id ? 1 : 0
  }
}, { immediate: true })

useThreeScene(canvas, {
  fov: 52,
  cameraZ: 8,
  narrowDistance: 2.2,
  build: ({ scene, camera }) => {
    scene.add(new THREE.AmbientLight(0x818cf8, 0.8))
    const coreLight = new THREE.PointLight(0x22d3ee, 3, 22)
    coreLight.position.set(0, 0, 4)
    scene.add(coreLight)
    const rimLight = new THREE.PointLight(0x6366f1, 2.4, 24)
    rimLight.position.set(5, 4, 3)
    scene.add(rimLight)

    const root = new THREE.Group()
    scene.add(root)

    // ── Order core ──
    const coreGroup = new THREE.Group()
    const coreShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 1),
      new THREE.MeshPhongMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        emissive: 0x4338ca,
        emissiveIntensity: 0.4
      })
    )
    const coreInner = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.85,
        emissive: 0x0891b2,
        emissiveIntensity: 0.7,
        shininess: 200
      })
    )
    coreGroup.add(coreShell, coreInner)
    root.add(coreGroup)

    // ── Nodes ──
    const nodes: OrbitNode[] = []

    function addNode(
      meta: { id: string, color: number },
      radius: number,
      angle: number,
      speed: number,
      height: number
    ) {
      const group = new THREE.Group()

      const body = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.24, 0),
        new THREE.MeshPhongMaterial({
          color: meta.color,
          transparent: true,
          opacity: 0.9,
          emissive: meta.color,
          emissiveIntensity: 0.35,
          shininess: 160
        })
      )
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.52, 24, 24),
        new THREE.MeshBasicMaterial({
          color: meta.color,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.012, 8, 48),
        new THREE.MeshBasicMaterial({ color: meta.color, transparent: true, opacity: 0.45 })
      )
      ring.rotation.x = Math.PI / 2.6

      group.add(body, glow, ring)
      root.add(group)

      nodeScales[meta.id] = meta.id === props.activeId ? 1 : 0

      nodes.push({
        id: meta.id,
        radius,
        speed,
        height,
        group,
        glow: glow.material as THREE.MeshBasicMaterial,
        currentScale: 0
      })
    }

    productNodes.forEach((meta, i) => {
      addNode(meta, 2.5, (i / productNodes.length) * Math.PI * 2, 0.22, 0.5)
    })
    carrierNodes.forEach((meta, i) => {
      addNode(meta, 4.1, (i / carrierNodes.length) * Math.PI * 2 + 0.6, -0.13, 0.22)
    })

    // ── Connection lines (core → node) ──
    const linePositions = new Float32Array(nodes.length * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    root.add(lines)

    // ── Particle halo ──
    const haloCount = 260
    const haloPositions = new Float32Array(haloCount * 3)
    for (let i = 0; i < haloCount; i++) {
      const radius = 5 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      haloPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      haloPositions[i * 3 + 1] = radius * Math.cos(phi) * 0.6
      haloPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 2
    }
    const haloGeometry = new THREE.BufferGeometry()
    haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3))
    const dotTexture = createDotTexture()
    const halo = new THREE.Points(
      haloGeometry,
      new THREE.PointsMaterial({
        size: 0.12,
        map: dotTexture,
        color: 0x818cf8,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      })
    )
    root.add(halo)

    // ── Ground ring ──
    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.008, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.25 })
    )
    orbitRing.rotation.x = Math.PI / 2
    root.add(orbitRing)

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.1, 0.006, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.16 })
    )
    outerRing.rotation.x = Math.PI / 2
    root.add(outerRing)

    const positionAttribute = lineGeometry.getAttribute('position') as THREE.BufferAttribute

    return ({ elapsed, pointer, size }) => {
      root.rotation.y = elapsed * 0.05 + pointer.x * 0.35
      root.rotation.x = Math.sin(elapsed * 0.12) * 0.04 + pointer.y * 0.18
      root.scale.setScalar(size.width < 768 ? 0.72 : 1)

      coreShell.rotation.x = elapsed * 0.25
      coreShell.rotation.y = elapsed * 0.32
      coreInner.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.06)

      nodes.forEach((node, index) => {
        const angle = index * 0.9 + elapsed * node.speed
        const x = Math.cos(angle) * node.radius
        const z = Math.sin(angle) * node.radius
        const y = Math.sin(elapsed * 0.6 + index) * node.height * 0.35

        node.group.position.set(x, y, z)
        node.group.lookAt(camera.position)

        const target = nodeScales[node.id] ?? 0
        node.currentScale += (target - node.currentScale) * 0.08
        const emphasis = 1 + node.currentScale * 0.55
        node.group.scale.setScalar(emphasis)
        node.glow.opacity = 0.12 + node.currentScale * 0.3

        const offset = index * 6
        positionAttribute.array[offset] = 0
        positionAttribute.array[offset + 1] = 0
        positionAttribute.array[offset + 2] = 0
        positionAttribute.array[offset + 3] = x
        positionAttribute.array[offset + 4] = y
        positionAttribute.array[offset + 5] = z
      })

      positionAttribute.needsUpdate = true

      lineMaterial.opacity = 0.2 + Math.sin(elapsed * 0.8) * 0.06
      halo.rotation.y = -elapsed * 0.02
      orbitRing.rotation.z = elapsed * 0.05
      outerRing.rotation.z = -elapsed * 0.03

      coreLight.position.x = Math.sin(elapsed * 0.4) * 3
      coreLight.position.y = Math.cos(elapsed * 0.5) * 2.4

      camera.lookAt(0, 0, 0)
    }
  }
})
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
