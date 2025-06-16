import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

function goToGithub() {
  window.open('https://github.com/7719Drinkin/HCI_Project', '_blank')
}

app.mount('#app')
