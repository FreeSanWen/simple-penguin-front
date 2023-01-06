import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './util/router'


const app = createApp(App)
app.use(router).mount('#app')
