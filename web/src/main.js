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

const toastConfig = {
        transition: "Vue-Toastification__bounce",
        maxToasts: 5,
        newestOnTop: true,
        filterToasts: toasts => {
            // Keep track of existing types
            const types = {};
            return toasts.reduce((aggToasts, toast) => {
            // Check if type was not seen before
            if (!types[toast.type]) {
                aggToasts.push(toast);
                types[toast.type] = true;
            }
            return aggToasts;
            }, []);
        }
    }

app.use(router).component('vue-select', VueSelect).use(Toast, toastConfig).use(plugin, defaultConfig).mount('#app')
