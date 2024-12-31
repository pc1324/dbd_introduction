<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <el-card class="welcome-card" style="max-width: 100vw">
    <template #header>
      <div class="card-header">
        <span>欢迎来到黎明杀机信息介绍管理平台</span>
      </div>
    </template>
    <p>欢迎管理员：{{ userStore.user.username }}</p>
    <div class="avatar">
      <img :src="userStore.user.avatar || avatar" style="width: 100%" />
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.welcome-card {
  min-height: 30vh;
  .avatar {
    margin: 0 auto;
    width: 250px;
    img {
      width: 100%;
    }
  }
}
</style>
