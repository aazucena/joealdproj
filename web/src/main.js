import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSelect from 'vue-next-select'
import 'bootstrap'

const app = createApp(App).use(store)
app.use(router).use(VueAxios, axios).provide('axios', app.config.globalProperties.axios)
    .component('vue-select', VueSelect).mount('#app')
