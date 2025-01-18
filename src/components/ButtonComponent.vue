<template>
  <!-- <button data-sentinel :type="props.type" :class="props.class + ' bg-orange-500 text-black px-2 w-full py-1 hover:bg-orange-500/80'">
    <slot></slot>
  </button> -->
  
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
