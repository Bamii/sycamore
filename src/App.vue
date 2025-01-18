<script setup lang="ts">
import CustomerList from './components/CustomerList.vue'
import CreateCustomer from './components/CreateCustomer.vue'
import { Mode } from './types.ts'
import { useListStore } from './stores/cslist.ts'

const state = useListStore();
</script>

<template>
  <main class="text-sm p-4 text-orange-500 h-screen _overflow-hidden grid grid-rows-[20vh_,70vh] grid-flow-dense">
    <div class="_text-center grid grid-cols-2 items-end pb-6 w-full md:max-w-3xl mx-auto">
      <div>
        welcome to the customerinator 5000 
        <div class="mt-3 _border border-orange-500 _divide-y divide-solid divide-orange-500 _flex flex-col _gap-2 cursor-pointer">
          <div @click="state.toggle_mode(Mode.List)" class="_px-2">
            <span v-if="state.mode == Mode.List"> > </span> View Customer List
          </div>
          <div @click="state.toggle_mode(Mode.Create)" class="_px-2">
            <span v-if="state.mode == Mode.Create"> > </span> Create Customer
          </div>
        </div>
      </div>
      
      <div v-if="state.mode != Mode.List" class="text-xs">
        <div> instructions: </div>
        <ul class="list-disc list-inside">
          <li> use tabs to scroll through the inputs. </li>
          <li> use the arrow keys to scroll through the list of states </li>
          <li> '!!' appears in front of invalid fields. </li>
        </ul>
      </div>
      <div v-else>
      <div> instructions: </div>
      <ul class="list-disc list-inside">
        <li> enter 'on' or 'off' while filtering for 'active' status  </li>
      </ul>
      </div>
    </div>
    
    <div class="flex items-center justify-center _mt-12">
      <div class="w-full md:max-w-3xl m-auto h-[70vh]"> 
        <CustomerList v-if="state.mode == Mode.List" />
        <CreateCustomer v-if="state.mode == Mode.Create" :toggleMode="() => {state.toggle_mode(Mode.List)}" />
        <CreateCustomer type="edit" :data="state.selected" v-if="state.mode == Mode.Edit" :toggleMode="() => {state.toggle_mode(Mode.List)}" />
      </div>
    </div>
  </main>
</template>
