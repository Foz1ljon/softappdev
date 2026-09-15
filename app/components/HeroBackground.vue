<script setup lang="ts">
import * as THREE from 'three'

/**
 * Hero WebGL scene: a floating cluster of wireframe solids around a slowly
 * pulsing core, lit by orbiting coloured point lights, with a particle field
 * and pointer-driven camera parallax.
 */
const canvas = ref<HTMLCanvasElement>()

const palette = [0x6366f1, 0x06b6d4, 0x10b981, 0xf59e0b, 0x818cf8]

useThreeScene(canvas, {
  fov: 60,
  cameraZ: 5,
  narrowDistance: 1.6,
  build: ({ scene, camera }) => {
    // ── Lights ──
    scene.add(new THREE.AmbientLight(0x6366f1, 0.5))

    const lights = [
      { light: new THREE.PointLight(0x6366f1, 2.5, 25), pivot: 4, speed: 0.25 },
      { light: new THREE.PointLight(0x06b6d4, 2, 25), pivot: 3.6, speed: -0.21 },
      { light: new THREE.PointLight(0x10b981, 1.4, 18), pivot: 3.2, speed: 0.17 },
      { light: new THREE.PointLight(0xf59e0b, 0.9, 15), pivot: 4.4, speed: -0.13 }
    ]
    lights.forEach(({ light, pivot }) => {
      light.position.set(pivot, pivot * 0.6, 3)
      scene.add(light)
    })

    const wire = (color: number, opacity: number) =>
      new THREE.MeshPhongMaterial({ color, wireframe: true, transparent: true, opacity })

    const solid = (color: number, opacity: number) =>
      new THREE.MeshPhongMaterial({ color, transparent: true, opacity, shininess: 140, specular: color })

    // ── Core piece ──
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), wire(0x6366f1, 0.2))
    core.position.set(2.5, 0.5, -1)

    // ── Satellites ──
    const satellites: { mesh: THREE.Mesh, home: THREE.Vector3, speed: number, phase: number, spin: number }[] = []
    const addSatellite = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      position: [number, number, number],
      spin = 0.18,
      speed = 0.4
    ) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      scene.add(mesh)
      satellites.push({
        mesh,
        home: new THREE.Vector3(...position),
        speed,
        phase: Math.random() * Math.PI * 2,
        spin
      })
      return mesh
    }

    addSatellite(new THREE.OctahedronGeometry(0.9, 0), solid(0x818cf8, 0.07), [-2.2, 1.8, -0.5], 0.22, 0.5)
    addSatellite(new THREE.TorusKnotGeometry(0.65, 0.22, 90, 14, 2, 3), wire(0x06b6d4, 0.16), [-1.5, -1.5, 0], 0.3, 0.35)
    addSatellite(new THREE.DodecahedronGeometry(0.75, 0), wire(0x10b981, 0.14), [2, -2, -1.5], 0.16, 0.6)
    addSatellite(new THREE.TetrahedronGeometry(0.55, 0), wire(0xf59e0b, 0.14), [0, 2.2, -2], 0.26, 0.5)
    addSatellite(new THREE.TorusGeometry(1.0, 0.06, 16, 72), wire(0x818cf8, 0.12), [-0.5, 0, -2.5], 0.1, 0.28)

    // ── Small cubes orbiting the cluster ──
    for (let i = 0; i < 6; i++) {
      const edge = 0.2 + Math.random() * 0.2
      const angle = (i / 6) * Math.PI * 2
      const radius = 2.8 + Math.random() * 1.2
      addSatellite(
        new THREE.BoxGeometry(edge, edge, edge),
        wire(palette[i % palette.length]!, 0.18),
        [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, -1.5 - Math.random() * 1.5],
        0.4,
        0.5 + Math.random() * 0.3
      )
    }

    // ── Sphere cluster ──
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x818cf8, transparent: true, opacity: 0.22, shininess: 200 })
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2
      const radius = 2.5 + Math.random() * 2
      addSatellite(
        new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 16, 16),
        sphereMaterial,
        [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, -1 - Math.random() * 3],
        0.5,
        0.3 + Math.random() * 0.4
      )
    }

    // ── Particles ──
    const particleCount = 240
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const particlePalette = palette.map(color => new THREE.Color(color))
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      const color = particlePalette[Math.floor(Math.random() * particlePalette.length)]!
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: 0.035,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        sizeAttenuation: true,
        depthWrite: false
      })
    )
    scene.add(particles)

    return ({ elapsed, pointer }) => {
      // Core pulse
      const pulse = 1 + Math.sin(elapsed * 0.9) * 0.04
      core.rotation.x = elapsed * 0.12
      core.rotation.y = elapsed * 0.18
      core.scale.setScalar(pulse)

      satellites.forEach(({ mesh, home, speed, phase, spin }, i) => {
        mesh.rotation.x = elapsed * spin
        mesh.rotation.y = elapsed * spin * 0.8 + i * 0.3
        mesh.position.x = home.x + Math.sin(elapsed * speed + phase) * 0.32
        mesh.position.y = home.y + Math.cos(elapsed * speed * 0.8 + phase) * 0.3
      })

      particles.rotation.y = elapsed * 0.015
      particles.rotation.x = elapsed * 0.008

      lights.forEach(({ light, pivot, speed }, i) => {
        light.position.x = Math.sin(elapsed * speed + i) * pivot
        light.position.y = Math.cos(elapsed * speed * 1.3 + i) * pivot * 0.75
        light.position.z = 2.4 + Math.sin(elapsed * speed * 0.7 + i) * 1.6
      })

      camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.03
      camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03
      camera.lookAt(0, 0, -1)
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
