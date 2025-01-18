import { getUserInfoService } from '@/api/user.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模式 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    // token
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息
    const user = ref({})
    const getUser = async () => {
      const res = await getUserInfoService() // 请求获取数据
      // console.log('已获取用户信息', res)
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
