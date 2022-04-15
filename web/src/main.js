import { createApp } from 'vue'
import * as bootstrap from 'react-bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
createApp(App).use(store).use(router).use(bootstrap).mount('#app')
