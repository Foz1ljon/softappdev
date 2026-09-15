/**
 * 3D tilt hover effect — tracks the pointer over an element and applies a
 * perspective transform with a spring-like damping step, driven by
 * requestAnimationFrame so the transforms are never applied per raw mouse
 * event. Works for both pointer and touch input and never runs on unmounted
 * components.
 */
export function useCardTilt(intensity = 12) {
  const cardRef = ref<HTMLElement>()
  const isHovering = ref(false)

  const target = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }
  const glare = { target: 0, current: 0 }
  const transform = ref('')
  const glareStyle = ref<Record<string, string>>({})

  let frameId = 0

  function render() {
    const damping = 0.12
    current.x += (target.x - current.x) * damping
    current.y += (target.y - current.y) * damping
    glare.current += (glare.target - glare.current) * damping

    const scale = isHovering.value ? 1.02 : 1
    transform.value = `perspective(900px) rotateX(${current.y.toFixed(3)}deg) rotateY(${current.x.toFixed(3)}deg) scale(${scale})`
    glareStyle.value = {
      background: `radial-gradient(circle at ${50 + current.x * 4}% ${50 - current.y * 4}%, rgba(255,255,255,${glare.current.toFixed(3)}), transparent 62%)`
    }

    const settled
      = Math.abs(target.x - current.x) < 0.01
        && Math.abs(target.y - current.y) < 0.01
        && Math.abs(glare.target - glare.current) < 0.005

    if (settled && !isHovering.value) {
      current.x = 0
      current.y = 0
      glare.current = 0
      transform.value = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
      glareStyle.value = { background: 'transparent' }
      frameId = 0
      return
    }

    frameId = requestAnimationFrame(render)
  }

  function ensureFrame() {
    if (frameId === 0) {
      frameId = requestAnimationFrame(render)
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!cardRef.value || event.pointerType === 'touch') {
      return
    }
    const rect = cardRef.value.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    target.x = ((event.clientX - rect.left - centerX) / centerX) * intensity
    target.y = -((event.clientY - rect.top - centerY) / centerY) * intensity
    glare.target = 0.16
    ensureFrame()
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType === 'touch') {
      return
    }
    isHovering.value = true
    ensureFrame()
  }

  function onPointerLeave() {
    isHovering.value = false
    target.x = 0
    target.y = 0
    glare.target = 0
    ensureFrame()
  }

  onMounted(() => {
    if (!cardRef.value) {
      return
    }
    // Reduced-motion visitors get the glare, but no transform.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    cardRef.value.addEventListener('pointermove', onPointerMove)
    cardRef.value.addEventListener('pointerenter', onPointerEnter)
    cardRef.value.addEventListener('pointerleave', onPointerLeave)
  })

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
    frameId = 0
    cardRef.value?.removeEventListener('pointermove', onPointerMove)
    cardRef.value?.removeEventListener('pointerenter', onPointerEnter)
    cardRef.value?.removeEventListener('pointerleave', onPointerLeave)
  })

  const tiltStyle = computed(() => ({
    transform: transform.value || 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: isHovering.value ? 'transform 0.16s ease-out' : 'transform 0.5s ease-out'
  }))

  return {
    cardRef,
    tiltStyle,
    glareStyle: computed(() => glareStyle.value),
    isHovering
  }
}
