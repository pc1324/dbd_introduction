<script setup>
import {
  User,
  SwitchButton,
  CaretBottom,
  Aim,
  View,
  Key,
  ShoppingCart,
  UserFilled,
  MapLocation
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
// import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore() // 使用仓库
const router = useRouter() // 使用路由对象
// const route = useRoute() // 获取路由参数
// onMounted(() => {
//   console.log(route)
// })
// 加载时的激活项
const handleCommand = async (key) => {
  if (key === 'logout') {
    // 退出操作
    await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    // 清除本地数据（token + user信息）
    userStore.removeToken()
    userStore.setUser({})
    router.push('/adminLogin')
  } else {
    // 跳转操作
    router.push(`/manaSystem/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo"></div>
      <!-- 侧边菜单 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="/manaSystem/welcome">
          <el-icon><icon-menu /></el-icon>
          <span>欢迎</span>
        </el-menu-item>
        <el-menu-item index="/manaSystem/user/userList">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/manaSystem/survivor">
          <el-icon><UserFilled /></el-icon>
          <span>逃生者管理</span>
        </el-menu-item>
        <el-menu-item index="/manaSystem/killer">
          <el-icon><View /></el-icon>
          <span>杀手管理</span>
        </el-menu-item>
        <!-- 多级菜单的标题 - 具名插槽 title-->
        <el-sub-menu>
          <template #title>
            <el-icon><Aim /></el-icon>
            <span>技能管理</span>
          </template>
          <el-menu-item index="/manaSystem/skill/survivor">
            <el-icon><User /></el-icon>
            <span>逃生者技能</span>
          </el-menu-item>
          <el-menu-item index="/manaSystem/skill/killer">
            <el-icon><User /></el-icon>
            <span>杀手技能</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/manaSystem/prop">
          <el-icon><Key /></el-icon>
          <span>道具管理</span>
        </el-menu-item>
        <el-menu-item index="/manaSystem/map">
          <el-icon><MapLocation /></el-icon>
          <span>地图管理</span>
        </el-menu-item>
        <el-menu-item index="/manaSystem/offer">
          <el-icon><ShoppingCart /></el-icon>
          <span>祭品管理</span>
        </el-menu-item>
      </el-menu>
      <!-- 侧边菜单-结束 -->
    </el-aside>
    <el-container>
      <!-- header -->
      <el-header>
        <div>
          程序员：<strong>{{ userStore.user.username || '匿名' }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户,默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.avatar || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="myInfo" :icon="User"
                >我的信息</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>DBD介绍站后台管理系统 ©2024 Created by 雾中人</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    .logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
      span {
        font-size: 18px;
      }
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
