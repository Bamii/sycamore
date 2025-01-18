<template>
  <div class="w-full">
    <QuillEditor 
      contentType="html" 
      ref="editor" 
      placeholder="Enter some text..."
      :toolbar="props.toolbar ? 'essential' : '#my-toolbar'" 
      :content="props.content ?? 'Enter some text...'"
    >
      <template #toolbar>
        <div id="my-toolbar" class="p-0!">
        </div>
      </template>
    </QuillEditor>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue'

const editor = ref()
const props = defineProps({
  content: String,
  enable: {
    default: true,
    type: Boolean
  },
  toolbar: {
    default: true,
    type: Boolean
  }
})

defineExpose({
  get_data: () => editor.value.getHTML()
})
</script>

<style>
.ql-container.ql-snow,
.ql-toolbar.ql-snow {
  /* border: 1px solid #f97316; */
  border: 0;
}

.ql-toolbar.ql-snow {
  padding: 0;
  border: 0;
  border-bottom: 1px solid #f97316;
  padding-bottom: 0.4rem;
  margin-bottom: 0.3rem;
}

.ql-editor {
  padding: 0.2rem 0;
}
</style>