import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from './modules/user.js' // 接收user模块的所有按需导出，并且导入后再次导出
export * from './modules/home.js' // 接收home模块的所有按需导出，并且导入后再次导出
