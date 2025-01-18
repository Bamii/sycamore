import './assets/output.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import wysiwyg from "vue-wysiwyg";

import App from './App.vue'

const app = createApp(App)

app.use(wysiwyg, {}); // config is optional. more below

app.use(createPinia())

app.mount('#app')
