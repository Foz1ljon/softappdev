<script lang="ts">
import { defineComponent, h } from 'vue'
import { iconBodies } from '~/assets/icons'

/**
 * Icon set rendered as inline SVG.
 *
 * Geometry is generated into `app/assets/icons.ts` at build time, so no icon
 * runtime, web font or external sprite request is needed. The markup is passed
 * through the `innerHTML` vnode prop, which Vue renders on both the server and
 * the client — icons are therefore present in the prerendered HTML and in the
 * first paint after hydration.
 */
export default defineComponent({
  name: 'AppIcon',
  props: {
    /** Icon id, e.g. `i-lucide-rocket` or `i-simple-icons-github`. */
    name: { type: String, required: true }
  },
  setup(props) {
    return () => h('svg', {
      'xmlns': 'http://www.w3.org/2000/svg',
      'width': 24,
      'height': 24,
      'viewBox': '0 0 24 24',
      'fill': 'none',
      'aria-hidden': 'true',
      'focusable': 'false',
      'data-icon': props.name,
      'innerHTML': iconBodies[props.name] ?? ''
    })
  }
})
</script>
