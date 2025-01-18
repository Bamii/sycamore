<template>
  <label :for="props.name" class="flex _grid grid-cols-[auto,_1fr] items-center gap-4">
    <div class="w-max block mb-auto whitespace-nowrap"> {{ state.error ? '!!' : '' }} {{ props.title ?? "input" }} > </div>
  
    <div v-if="props.type == 'text' || props.type == 'number'" class="flex items-center">
      <div> {{ text }} </div>
      <div v-if="active" class="animate-pulse"> | </div>
      <input 
        required
        data-sentinel
        ref="input_ref"
        :type="props.type"
        v-validate="props.pattern"
        @keydown.enter="() => { return false }"
        @blur="active = false" 
        @focus="active = true" 
        :value="text"
        @input="e => { text = e.target.value }"
        @change="e => { text = e.target.value }"
        class="bg-zinc-950 _w-full h-[0.1px] w-[0.1px] outline-none ring-none" 
        :id="props.name" 
        :name="props.name"
      />
    </div>
    
    <div v-if="props.type == 'checkbox'" class="flex items-center justify-center h-[15px] w-[15px] border border-orange-500">
      <input
        required
        ref="input_ref"
        v-validate="props.pattern"
        data-sentinel 
        :id="props.name" 
        :name="props.name"  
        :value="text"
        @input="e => { text = e.target.value }"
        @change="e => { text = e.target.value }"
        type="checkbox" 
        class="peer h-[0.1px] w-[0.1px] outline-none ring-none"
      />
      <div class="peer-checked:bg-orange-500 h-[8px] w-[8px] _m-1">
      </div>
    </div>
    
    <div v-if="props.type == 'select'" class="">
      <fieldset class="flex flex-wrap _gap-2">
        <label 
          v-bind:key="state" 
          v-for="state in props.items"
          class="cursor-pointer hover:bg-orange-500 hover:text-black grid grid-cols-1 grid-rows-1"
        > 
          <input
            required
            :checked="props.value == state" 
            tabindex="0" 
            ref="input_ref"
            class="peer clump h-[0.1px] w-[0.1px]" 
            type="radio" 
            :id="props.name" 
            :value="state" 
            @input="e => { text = e.target.value }"
            @change="e => { text = e.target.value }"           :name="props.name" 
          />
          <div class="peer-checked:bg-orange-500 peer-checked:text-black hover:bg-orange-500  bg-zinc-950 px-2 clump">
            {{ state }} 
          </div>
        </label>
      </fieldset>
    </div>
    
    <slot v-if="props.type == 'slot'"></slot>
  </label>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const props = defineProps({
  title: String,
  name: String,
  next: Function,
  value: String,
  items: Array,
  pattern: String,
  errorMessage: String,
  type: {
    default: 'text',
    type: String
  }
})

const state = reactive({
  error: false,
  active: false
})

const text = defineModel();
if(props.value) text.value = props.value;
const input_ref = ref()
const active = ref(false)
const vValidate = {
  mounted: (el, binding) => {
    el.addEventListener('focus', e => {
      try {
        e.target.setSelectionRange(e.target.value.length, e.target.value.length)
      } catch(_) {}
    })
    
    el.errorMessage = props.errorMessage;
    const validate = el.validate = function() {
      if(binding.value) {
        return new RegExp(binding.value).test(el.value)
      } else {
        return true;
      }
    }
    
    el.addEventListener('blur', (e) => {
      if(binding.value) {
        const valid = validate(e.target.value)
        if(valid) {
          state.error = false;
        } else {
          state.error = true;
        }
      } else {
        state.error = false;
      }
    })
  }
}
</script>