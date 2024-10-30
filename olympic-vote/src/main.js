import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router/index.js'
import 'element-plus/theme-chalk/index.css'
import './assets/css/index.css'
import 'element-plus/dist/index.css'


createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
