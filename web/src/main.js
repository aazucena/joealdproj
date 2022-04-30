import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSelect from 'vue-next-select'
import 'bootstrap'
import { plugin, defaultConfig } from '@formkit/vue'

const app = createApp(App).use(store)


app.use(router).component('vue-select', VueSelect).use(plugin, defaultConfig).mount('#app')
