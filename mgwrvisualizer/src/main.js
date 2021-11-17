import { createPinia } from 'pinia'
import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(createPinia()).mount('#app')
