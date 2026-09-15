<script setup lang="ts">
import * as THREE from 'three'

/**
 * Site-wide ambient WebGL layer: a slow particle field with a few drifting
 * wireframe solids. It sits behind every page, reacts gently to the pointer and
 * the scroll position, and pauses itself when offscreen or hidden.
 */
const canvas = ref<HTMLCanvasElement>()

const palette = [0x6366f1, 0x06b6d4, 0x10b981, 0x818cf8, 0x22d3ee]

const scroll = { progress: 0 }
function onScroll() {
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  scroll.progress = window.scrollY / max
}

function createDotTexture() {
  const size = 64
  const element = document.createElement('canvas')
  element.width = size
  element.height = size
  const ctx = element.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(element)
  texture.needsUpdate = true
  return texture
}

useThreeScene(canvas, {
  fov: 70,
  cameraZ: 9,
  build: ({ scene, camera }) => {
    // ── Lights for the wireframe solids ──
    scene.add(new THREE.AmbientLight(0x6366f1, 0.6))
    const keyLight = new THREE.PointLight(0x818cf8, 2.2, 30)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x22d3ee, 1.6, 30)
    fillLight.position.set(-5, -3, 4)
    scene.add(fillLight)

    // ── Particle field ──
    const count = 320
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3
      const color = new THREE.Color(palette[i % palette.length]!)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const dotTexture = createDotTexture()
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: dotTexture,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)

    // ── Drifting wireframe solids ──
    const solids: THREE.Mesh[] = []
    const solidSpots = [
      { x: -6.4, y: 2.6, z: -4 },
      { x: 6.6, y: -1.4, z: -5 },
      { x: 5.2, y: 3.4, z: -6 },
      { x: -5.6, y: -3.2, z: -4.5 },
      { x: 0.4, y: 4.4, z: -7 }
    ]
    const solidGeometry = [
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.OctahedronGeometry(1.15, 0),
      new THREE.DodecahedronGeometry(1.05, 0),
      new THREE.TorusGeometry(1.35, 0.06, 12, 48),
      new THREE.TetrahedronGeometry(0.95, 0)
    ]
    solidGeometry.forEach((geometry, i) => {
      const spot = solidSpots[i]!
      const solid = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: palette[i % palette.length]!,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
          shininess: 90
        })
      )
      solid.position.set(spot.x, spot.y, spot.z)
      solids.push(solid)
    })

    // ── Group everything so pointer + scroll can move the whole field ──
    const group = new THREE.Group()
    group.add(particles)
    solids.forEach(solid => group.add(solid))
    scene.add(group)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return ({ elapsed, pointer, size }) => {
      group.rotation.y = elapsed * 0.012 + pointer.x * 0.18
      group.rotation.x = Math.sin(elapsed * 0.05) * 0.05 + pointer.y * 0.08
      group.position.y = scroll.progress * 1.6
      group.position.x = -pointer.x * 0.35
      group.scale.setScalar(size.width < 768 ? 0.7 : 1)

      solids.forEach((solid, i) => {
        const spot = solidSpots[i]!
        solid.rotation.x = elapsed * (0.05 + i * 0.012)
        solid.rotation.y = elapsed * (0.07 + i * 0.01)
        solid.position.y = spot.y + Math.sin(elapsed * 0.22 + i) * 0.5
      })

      keyLight.position.x = Math.sin(elapsed * 0.12) * 7
      keyLight.position.y = Math.cos(elapsed * 0.16) * 5
      fillLight.position.x = Math.cos(elapsed * 0.1) * 6.5
      fillLight.position.y = Math.sin(elapsed * 0.13) * 4.5

      camera.lookAt(0, scroll.progress * 0.8, 0)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <canvas
      ref="canvas"
      class="h-full w-full"
    />
    <div class="backdrop-vignette absolute inset-0" />
  </div>
</template>
