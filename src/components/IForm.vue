<template>
  <form @submit.prevent.stop="submit_form">
    <slot name="errors">
      <div class="text-xs text-right" v-bind:key="index" v-for="error, index in state.errors"> {{ error }} </div>
    </slot>
    <slot> </slot>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps({
  validate: Function,
  on_submit: Function
})

const state = reactive({
  errors: []
})

function submit_form(e) {
  state.errors = []
  const nodes = [...e.target.querySelectorAll('[data-sentinel]')]
  
  const valid = nodes.map(e => e.validate?.())
  if(!valid.every(e => e)) {
    state.errors = nodes.filter(e => !e.validate()).map(e => e.errorMessage)
    return;
  }
  
  const _data = new FormData(e.target)
  const data = Object.fromEntries(_data.entries())  
  props.validate?.(data)
  props.on_submit?.(data)
  e.target.reset()
}
</script>