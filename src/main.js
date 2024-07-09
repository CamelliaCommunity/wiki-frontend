import './assets/style/main.scss'
import './assets/style/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Plugins
import 'vue3-toastify/dist/index.css';

app.mount('#app')
