<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps({ src: String, title: String, crop: { type: Array, default: () => [0, 0, 1, 1] } })
const ready = ref(false)
const ratio = ref(1.6)
watch(() => props.src, () => { ready.value = false })
const viewportStyle = computed(() => ({ aspectRatio: String(ratio.value * props.crop[2] / props.crop[3]) }))
const imageStyle = computed(() => ({ width: `${100 / props.crop[2]}%`, left: `${-100 * props.crop[0] / props.crop[2]}%`, top: `${-100 * props.crop[1] / props.crop[3]}%` }))
function loaded(event) {
  ratio.value = event.target.naturalWidth / event.target.naturalHeight
  ready.value = true
}
</script>

<template>
  <figure class="screenshot" :style="viewportStyle" :aria-label="title">
    <img v-if="src" :src="src" :alt="title" :style="imageStyle" :class="{ ready }" @load="loaded" @error="ready = false" />
    <span v-if="!ready" class="image-status">Ładowanie zrzutu…</span>
  </figure>
</template>
