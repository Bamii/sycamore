<template>
  <div class="divide-x divide-y divide-orange-500 border-2 border-orange-500 flex flex-col md:grid md:grid-cols-2 h-full w-full">
    <div class="divide-y divide-orange-500">
      <div class="border-b border-orange-500 p-2 pl-4 text-sm">
        Customer List
      </div>

      <Search />
      
      <Filters />
      
      <div class="p-4 overflow-auto">
        <div v-bind:key="index" v-for="customer, index in store.filtered">
          <div @click.stop="() => {select_customer(customer)}" class="cursor-pointer flex items-center justify-between w-full"> 
            <div class="flex-1 hover:bg-orange-500 hover:text-black mr-1"> 
              {{ customer.firstname }} {{ customer.lastname }}
            </div>
            <div @click.stop="() => {delete_customer(customer.id)}"> [x] </div>
          </div>
        </div>
        
        <div v-if="store.filtered.length == 0 " class="text-center">
          (-) this is an empty list (-)
        </div>
      </div>
    </div>

    <div class="relative mt-auto md:mt-0 overflow-auto">
      <div class="sticky border-b border-orange-500 p-2 pl-4 text-sm">
        Customer Details
      </div>
      
      <div class="p-4">
        <div v-if="state.selected" class="flex flex-col gap-[0.5rem]">
          <div>
            <span> name > </span> 
            {{ state.selected.firstname }} {{ state.selected.lastname }}
          </div>
          
          <div>
            <div v-if="state.selected.active">
              <span> status > </span> active
            </div>
            <div v-else>
              <span> status > </span> inactive
            </div>
          </div>

          <div>
            <span> email > </span> {{ state.selected.email }}
          </div>
          
          <div>
            <span> state > </span> {{ state.selected.state }}
          </div>

          <div class="flex _items-center gap-4">
            <span class="whitespace-nowrap"> details > </span> 
            <Editor :controls="false" :content="state.selected.details" :enable="false" :toolbar="false" />
          </div>

          <div class="grid grid-cols-2 mt-5 divide-x divide-zinc-950">
            <Button @click="delete_customer(state.selected.id)"> delete </Button>
            <Button @click="state.edit_customer()"> edit </Button>
          </div>
        </div>
        <div v-else> select a customer from the list. </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './ButtonComponent.vue'
import Editor from './QuillComponent.vue'
import Search from './SearchComponent.vue'
import Filters from './FiltersComponent.vue'
import {useCRUDStore} from "../stores/crud.ts"
import {useListStore} from "../stores/cslist.ts"

const store = useCRUDStore()
const state = useListStore();

function select_customer(customer) {
  state.select_customer(customer)
}

function delete_customer(id) {
  if(id == state.selected?.id) {
    state.unselect_customer()
  }
  store.delete(id)
}
</script>

<style scoped>
</style>
