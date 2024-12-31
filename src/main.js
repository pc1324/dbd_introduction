import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import '@/style/base.less'

// vue-quill富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
