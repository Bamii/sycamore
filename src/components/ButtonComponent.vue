<template>
  <button :type="props.type" :class="props.class + ' mt-2 gap-2'">
    [+]
    <slot></slot>
    [+]
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  class: String,
  type: {
    default: "button",
    type: String
  }
})
</script>
