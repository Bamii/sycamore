<template>
  <div class="flex overflow-auto py-2 px-4" v-if="store.filters.size !== 0">
    <div class="whitespace-nowrap mr-4"> filters > </div>
    <div class="flex items-center space-x-4">
      <div class="whitespace-nowrap" v-bind:key="filter" v-for="filter in store.filters">
        {{ filter[1] }} ({{ filter[0] }}) 
        <span @click="store.unsearch(filter[0])" class="cursor-pointer">
        [x]
        </span>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import {useCRUDStore} from "../stores/crud.ts"
const store = useCRUDStore()
</script>
