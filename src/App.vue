<script setup>
// 导入中文包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- 全局配置 中文包 -->
  <el-config-provider :locale="zhCn">
    <!-- 路由出口 -->
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="less"></style>
