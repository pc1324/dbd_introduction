<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/default.png'
import AudioCom from '@/components/audio/AudioCom.vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore() // 使用仓库
const router = useRouter()
// 高亮路径相关
const route = useRoute() // 使用路由对象
const activeIndex = ref('') // 激活的菜单项索引
// 计算激活的菜单项索引
const computedActiveIndex = computed(() => {
  if (route.path.startsWith('/survivor')) {
    return '/survivor'
  } else if (route.path.startsWith('/killer')) {
    return '/killer'
  }
  // 其他路径的处理逻辑
  return route.path
})
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    console.log('路由变化', newPath)
    activeIndex.value = computedActiveIndex.value
  },
  { immediate: true } // 立即执行一次
)

// onMounted(() => {
//   userStore.getUser()
// })
// 登出
const logout = async () => {
  // 退出操作
  await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 清除本地数据（token + user信息）
  userStore.removeToken()
  userStore.setUser({})
  router.push('/login')
}

const logoLink = () => {
  window.open('https://deadbydaylight.com/')
}
</script>

<template>
  <div class="layout-container">
    <!-- 菜单 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#000"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false"
      router
      @select="handleSelect"
    >
      <el-menu-item class="logo">
        <img
          @click="logoLink"
          style="height: 100%"
          src="@/assets/logo/dbd-logo(1).png"
          alt="黎明杀机logo"
        />
      </el-menu-item>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/survivor">逃生者</el-menu-item>
      <el-menu-item index="/killer">杀手</el-menu-item>
      <el-sub-menu index="2">
        <template #title><span>技能</span></template>
        <el-menu-item index="/skill/survivor">逃生者技能</el-menu-item>
        <el-menu-item index="/skill/killer">杀手技能</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/prop">道具</el-menu-item>
      <el-menu-item index="/map">地图</el-menu-item>
      <el-menu-item index="/offer">祭品</el-menu-item>
      <el-sub-menu>
        <template #title>
          <div class="myInfo">
            <el-avatar
              shape="circle"
              :size="50"
              :src="userStore.user.avatar || defaultAvatar"
            />
            <!-- username大于5个字就显示... -->
            <div class="username">
              {{
                userStore.user.username
                  ? userStore.user.username.length > 5
                    ? userStore.user.username.slice(0, 5) + '...'
                    : userStore.user.username
                  : '未登录'
              }}
            </div>
          </div>
        </template>
        <el-menu-item v-if="userStore.token" index="/user"
          >用户中心</el-menu-item
        >
        <el-menu-item v-if="userStore.user.identity === '0'" index="/manaSystem"
          >管理平台</el-menu-item
        >
        <el-menu-item v-if="!userStore.token" index="/login">登录</el-menu-item>
        <el-menu-item v-else @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <!-- 路由 -->
    <router-view></router-view>
    <!-- 背景音乐 -->
    <AudioCom></AudioCom>
    <!-- 网页底部 -->
    <div class="footer">
      <div class="list">
        <div class="list-item">
          <img src="@/assets/威斯克缝合怪.jpg" alt="" />
          <span>dbd_cloud</span>
        </div>
        <div class="list-item">
          <img src="@/assets/default.png" alt="" />
          <span>friend</span>
        </div>
        <div class="list-item">
          <img src="@/assets/default.png" alt="" />
          <span>friend</span>
        </div>
        <div class="list-item">
          <img src="@/assets/default.png" alt="" />
          <span>friend</span>
        </div>
      </div>
      <p>
        © 2024-2025 and and other friends and dbd-logo from Behaviour
        Interactive Inc. All rights reserved pcloud
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 菜单
.el-menu {
  span {
    font-size: 18px;
  }
  .myInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 25px;
    .el-avatar {
      margin: 0 auto;
    }
    .username {
      text-align: center;
    }
  }
}
.el-menu--horizontal {
  position: fixed;
  width: 100%;
  z-index: 999;
  --el-menu-horizontal-height: 100px;
  .el-menu-item {
    font-size: 18px;
  }
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
// 底部
.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 20px;
  width: 100%;
  height: 180px;
  color: #fff;
  background-color: #292d2e;
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    .list-item {
      width: 120px;
      height: 120px;
      // background-color: skyblue;
      text-align: center;
      img {
        width: 80%;
        height: 80%;
        border: 3px solid #666666;
        border-radius: 50%;
      }
      span {
        color: #fff;
      }
    }
  }
  p {
    text-align: center;
  }
}
</style>
