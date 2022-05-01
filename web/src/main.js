import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification"
import VueSelect from 'vue-next-select'
import 'bootstrap'
import "vue-toastification/dist/index.css"
import { plugin, defaultConfig } from '@formkit/vue'

const app = createApp(App).use(store)


app.use(router).component('vue-select', VueSelect).use(Toast).use(plugin, defaultConfig).mount('#app')
