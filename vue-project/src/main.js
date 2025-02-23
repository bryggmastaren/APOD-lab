import './assets/main.css'
import './assets/style.css' // här är all css hittills

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// skapa appen baserat (?) på App.vue
app.mount('#app')
