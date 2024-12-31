<script setup>
// import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore() // 使用仓库
// onMounted(() => {
//   userStore.getUser()
// })
</script>

<template>
  <div>{{ userStore.user }}</div>
  <!-- 路由 -->
  <router-view></router-view>
</template>

<style lang="less" scoped></style>
