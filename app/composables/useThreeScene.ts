import * as THREE from 'three'

export interface ThreeSceneContext {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  size: { width: number, height: number }
}

export interface ThreeFrameState {
  /** Seconds since the scene started. */
  elapsed: number
  /** Seconds since the previous frame. */
  delta: number
  /** Pointer position in the -1..1 range, eased towards the real cursor. */
  pointer: { x: number, y: number }
  size: { width: number, height: number }
}

export interface ThreeSceneOptions {
  fov?: number
  cameraZ?: number
  /** Extra camera distance applied on narrow viewports so geometry stays in frame. */
  narrowDistance?: number
  /**
   * Builds the scene. Return a callback to receive every frame, or nothing for
   * a static render (still redrawn on resize).
   */
  build: (context: ThreeSceneContext) => ((state: ThreeFrameState) => void) | undefined
}

/**
 * Shared lifecycle for every three.js canvas in the site: renderer and camera
 * setup, eased pointer tracking, resize observation, offscreen/hidden pausing,
 * reduced-motion handling and full GPU disposal on unmount.
 */
export function useThreeScene(
  canvas: Ref<HTMLCanvasElement | undefined>,
  options: ThreeSceneOptions
) {
  const prefersReducedMotion = ref(false)
  const isPaused = ref(true)

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let frameId = 0
  let resizeObserver: ResizeObserver | null = null
  let intersectionObserver: IntersectionObserver | null = null
  let clock: THREE.Clock | null = null

  const pointerTarget = { x: 0, y: 0 }
  const pointer = { x: 0, y: 0 }
  const size = { width: 0, height: 0 }

  let renderFrame: ((state: ThreeFrameState) => void) | null = null

  function measure() {
    if (!canvas.value || !renderer || !camera) {
      return
    }
    const width = canvas.value.clientWidth || window.innerWidth
    const height = canvas.value.clientHeight || window.innerHeight
    if (width === 0 || height === 0) {
      return
    }

    size.width = width
    size.height = height

    const aspect = width / height
    camera.aspect = aspect
    if (options.narrowDistance && aspect < 1) {
      camera.position.z = (options.cameraZ ?? 5) + options.narrowDistance * (1 - aspect)
    } else {
      camera.position.z = options.cameraZ ?? 5
    }
    camera.updateProjectionMatrix()

    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (!renderFrame) {
      renderer.render(scene!, camera)
    }
  }

  function tick() {
    frameId = requestAnimationFrame(tick)
    if (!clock || !renderer || !scene || !camera || !renderFrame) {
      return
    }

    pointer.x += (pointerTarget.x - pointer.x) * 0.06
    pointer.y += (pointerTarget.y - pointer.y) * 0.06

    renderFrame({
      elapsed: clock.getElapsedTime(),
      delta: clock.getDelta(),
      pointer: { ...pointer },
      size: { ...size }
    })

    renderer.render(scene, camera)
  }

  function start() {
    if (frameId !== 0 || prefersReducedMotion.value || !renderFrame) {
      return
    }
    clock = new THREE.Clock()
    tick()
  }

  function stop() {
    cancelAnimationFrame(frameId)
    frameId = 0
    clock = null
  }

  let offscreen = false

  function setPaused(paused: boolean) {
    isPaused.value = paused
    if (paused || document.hidden) {
      stop()
    } else {
      start()
    }
  }

  function onPointerMove(event: PointerEvent) {
    pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1
    pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onMounted(() => {
    if (!canvas.value) {
      return
    }

    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(options.fov ?? 60, 1, 0.1, 100)
    camera.position.z = options.cameraZ ?? 5

    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setClearColor(0x000000, 0)

    renderFrame = options.build({ scene, camera, renderer, size }) ?? null

    measure()
    start()

    resizeObserver = new ResizeObserver(() => measure())
    resizeObserver.observe(canvas.value)

    if (!prefersReducedMotion.value && typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) {
            return
          }
          offscreen = !entry.isIntersecting
          setPaused(offscreen)
        },
        { rootMargin: '120px' }
      )
      intersectionObserver.observe(canvas.value)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
  })

  function onVisibilityChange() {
    setPaused(offscreen)
  }

  onUnmounted(() => {
    stop()
    resizeObserver?.disconnect()
    intersectionObserver?.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('visibilitychange', onVisibilityChange)

    scene?.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line) {
        child.geometry?.dispose()
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((material) => {
          if (material && 'map' in material && material.map instanceof THREE.Texture) {
            material.map.dispose()
          }
          material?.dispose()
        })
      }
    })

    renderer?.dispose()
    renderer = null
    scene = null
    camera = null
  })

  return {
    isPaused: readonly(isPaused),
    prefersReducedMotion: readonly(prefersReducedMotion)
  }
}
