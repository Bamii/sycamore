<template>
  <div class="border-orange-500 flex flex-col  border-2 h-full w-full">
    <div v-if="props.type == 'create'" class="border-b border-orange-500 p-2 pl-4 text-sm">
      Create Customer
    </div>
    <div v-if="props.type == 'edit'" class="border-b border-orange-500 p-2 pl-4 text-sm">
      Edit Customer
    </div>
    
    <div class="p-4 overflow-auto">
      <IForm :on_submit="submit_form" class="">
        <div class="flex flex-col gap-[0.9rem]">
          <Input 
            errorMessage="First Name should be only alphabets" 
            pattern="^([a-zA-Z\s]+)$" 
            :value="props.data?.firstname" 
            name="firstname" 
            title="firstname"
          />
          <Input 
            errorMessage="Last Name should be only alphabets" 
            pattern="^([a-zA-Z\s]+)$" 
            :value="props.data?.lastname" 
            name="lastname" 
            title="lastname"
          />
          <Input 
            errorMessage="Email format is required." 
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" 
            :value="props.data?.email" 
            name="email" 
            title="email"
          />
          <Input 
            type="number" 
            errorMessage="Phone number can only be 11 digits." 
            pattern="[0-9]{11}" 
            :value="props.data?.phone_number" 
            name="phone_number" title="phone number"
          />
          <Input 
            :value="props.data?.active" 
            name="active" t
            itle="active" 
            type="checkbox"
          />
          <Input 
            :value="props.data?.state" 
            :items="states" 
            name="state" 
            title="state" 
            type="select"
          />
          
          <div class="_flex grid grid-cols-[auto,_1fr] items-center gap-4">
            <span class="w-max block mb-auto"> details > </span>
            <Quill ref="editor_ref" :content="props.data?.details" />
          </div>
          
          <button type="submit" onclick="return false;" style="display:none;"></button>
          <Button v-if="props.type == 'create'" class="mt-5" type="submit">
            submit
          </Button>
          
          <div class="flex items-center justify-around w-full" v-else>
            <Button type="button" @click="state.toggle_mode()" class="mt-5">
              go back
            </Button>
            <Button class="mt-5" type="submit">
              submit
            </Button>
          </div>
        </div>
      </IForm>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import Input from './InputComponent.vue'
import Button from './ButtonComponent.vue'
import Quill from './QuillComponent.vue'
import IForm from './IForm.vue'
import {useCRUDStore} from '../stores/crud.ts'
import {useListStore} from '../stores/cslist.ts'
// import Editor from './TipTap.vue'
// import { type Customer } from '../types'

const props = defineProps({
  toggleMode: Function,
  type: {
    default: "create",
    type: String
  },
  data: Object
})

const state = useListStore()
const store = useCRUDStore();
const editor_ref = ref();
const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
]

function submit_form(data) {
  if(props.type == 'create') {
    store.create({
      ...data,
      details: editor_ref.value.get_data()
    })
  } else {
    store.update(props.data.id, data)
  }
  props.toggleMode()
}
</script>

<style scoped>
.clump {
  grid-area: 1 / 1;
}
</style>