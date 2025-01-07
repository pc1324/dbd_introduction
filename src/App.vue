<script setup>
// 导入中文包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 判断是否移动端
// 检测 userAgent（浏览器信息）
!(function () {
  const userAgent = navigator.userAgent
  // 验证是否为Android或iPhone
  const android = userAgent.match(/(Android);?[\s/]+([\d.]+)?/)
  const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
  // 如果是Android或iPhone，则跳转至移动站点
  if (android || iphone) {
    location.href = 'http://www.baidu.com'
  }
})()
</script>

<template>
  <!-- 全局配置 中文包 -->
  <el-config-provider :locale="zhCn">
    <!-- 路由出口 -->
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="less"></style>
