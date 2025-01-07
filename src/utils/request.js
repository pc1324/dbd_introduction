import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'

const baseURL = 'http://192.168.1.148:8080/'
// 创建 axios 实例
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 携带 token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 处理业务成功
    if (response.data.code === 1) {
      return response
    }
    // 处理业务失败
    ElMessage.error(response.data.msg || '服务异常')
    if (response.data.code === 401) {
      router.push('/login')
    }
    return Promise.reject(response.data)
  },
  (error) => {
    // 特殊情况（未授权）
    if (error.response.status === 401) {
      // 跳转登录页
      router.push('/login')
    }
    // 默认情况
    // 对响应错误做点什么
    ElMessage.error(error.data.msg || '服务异常')
    return Promise.reject(error)
  }
)
export default request
export { baseURL }
