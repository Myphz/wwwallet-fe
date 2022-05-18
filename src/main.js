import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueProgressBar from "@aacassandra/vue3-progressbar"
import extractSass from "@/helpers/extractSass.helper.js";

const app = createApp(App)

app.use(createPinia())
app.use(VueProgressBar, {
  color: extractSass("primary"),
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
})
app.use(router(app))

app.mount('#app')
