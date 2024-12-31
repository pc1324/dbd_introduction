<script setup>
import { adminLoginService, getUserListService } from '@/api/user.js'
import { checkUserNameService } from '@/api/user.js'
import { testService } from '@/api/test'
import { useUserStore } from '@/stores'

// 登录
const login = async () => {
  const res = await adminLoginService({
    username: '张三',
    password: '123456'
  })
  console.log(res)
  ElMessage.success('登录成功')
  // token
  const userStore = useUserStore()
  userStore.setToken(res.data.data)
}

const getUserList = async () => {
  const res = await getUserListService()
  console.log(res)
}

const test1 = async () => {
  try {
    const res = await testService('1417230756@qq.com')
    console.log('res', res)
  } catch (error) {
    console.error('error', error)
  }
}

const test2 = async () => {
  try {
    const res = await checkUserNameService('admin')
    console.log('res', res)
  } catch (error) {
    console.error('error', error)
  }
}
</script>

<template>
  <div>布局架子</div>
  <button @click="login">测试登录</button>
  <button @click="getUserList">测试数据</button>
  <el-button type="primary" @click="test1">测试校验1</el-button>
  <el-button type="primary" @click="test2">测试校验2</el-button>

  <router-view></router-view>
</template>

<style lang="less" scoped></style>
