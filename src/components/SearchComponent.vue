<template>
  <IForm :on_submit="search" class="p-2 pl-4 flex flex-col gap-[0.5rem]">
    <Input v-if="category !== 'active'" name="text" title="search text" />
    <Input v-else name="text" title="search text" type="select" :items="['on', 'off']" />
    
    <Input v-model="category" ref="category_ref" name="category" title="category" type="select" :items="categories" />

    <Button type="submit">
      search
    </Button>
  </IForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Input from './InputComponent.vue'
import Button from './ButtonComponent.vue'
// import Editor from './TipTapComponent.vue'
// import Quill from './QuillComponent.vue'
import IForm from './IForm.vue'
import {useCRUDStore} from '../stores/crud.ts'

const category = ref('')
const categories = ["firstname", 'lastname', 'email', 'phone_number', 'state', 'active'];
const store = useCRUDStore();
function search(e) {
  store.search(e.category, e.text)
}
</script>
