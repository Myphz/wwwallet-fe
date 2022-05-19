import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import createRouter from './router'

import VueProgressBar from "@aacassandra/vue3-progressbar"
import extractSass from "@/helpers/extractSass.helper.js";

const app = createApp(App)
export const router = createRouter(app);

app.use(createPinia())
app.use(VueProgressBar, {
  color: extractSass("primary"),
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
})
app.use(router)
app.mount('#app')
