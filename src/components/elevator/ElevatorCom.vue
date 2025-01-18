<script setup>
// 组件使用方式：
// 组件属性 item，需要传递一个数组，包含对象，例如
// const elevatorItemInfo = ref([
//   { dom: backBox1, title: '返回模块1' },
//   { dom: backBox2, title: '返回模块2' },
//   { dom: backBox3, title: '返回模块3' }
// ])
// dom： 需要绑定的dom元素，title：标题，className：样式名称
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

// 接收数据
const props = defineProps({
  itemInfo: {
    type: Array
  },
  subHeight: {
    type: Number,
    default: 0
  }
})

// 返回顶部
const backTop = () => {
  document.documentElement.scrollTop = 0
  // console.log(document.documentElement.scrollTop)
}

// 前往某个盒子
const goToBox = (offsetTop) => {
  // console.log('前往盒子：', offsetTop)
  // console.log('盒子距离顶部高度：', offsetTop)
  document.documentElement.scrollTop = offsetTop
  // console.log('浏览器滚动高度距离', document.documentElement.scrollTop)
}

// 电梯组件
const elevator = ref(null)

const hidden = () => {
  elevator.value.style.opacity = 0
}
// 定义滚动事件处理函数
const scrollHandler = () => {
  // 当页面滚动大于300px，就显示电梯导航
  const n = document.documentElement.scrollTop
  // console.log('页面滚动高度', n)
  // console.log('电梯组件', elevator.value)
  if (elevator.value) {
    elevator.value.style.opacity = n >= 300 ? 1 : 0

    // 判断当前滚到的位置给电梯对应模块改字体颜色
    // 获取单个模块离顶部的高
    const arr = props.itemInfo.map((item) => {
      // console.log('前往条目', item.offsetTop)
      return item.offsetTop
    })

    // old的active
    const old = document.querySelector('.elevator-item .active')
    // 循环判断
    for (let i = 0; i < arr.length; i++) {
      // console.log('高度', arr[i])

      // 如果有下一个元素
      if (arr[i + 1]) {
        // 滚动距离在两个元素之间
        if (n >= arr[i] - props.subHeight && n < arr[i + 1] - props.subHeight) {
          if (old) {
            old.classList.remove('active')
          }
          // 获取对应电梯条目
          const dom = elevator.value.children[i + 1].children[0]
          // console.log('电梯条目', dom)
          dom.classList.add('active')
        }
      } else {
        // 滚动距离在大于此元素即可
        if (n >= arr[i] - props.subHeight) {
          if (old) {
            old.classList.remove('active')
          }
          // 获取对应电梯条目
          const dom = elevator.value.children[i + 1].children[0]
          // console.log('电梯条目', dom)
          dom.classList.add('active')
        }
      }
    }
  }
}

onUnmounted(() => {
  // console.log('电梯组件onUnmounted')
  // 移除window的scroll事件
  window.removeEventListener('scroll', scrollHandler)
})
onMounted(() => {
  // console.log('电梯组件onMounted', props.itemInfo)
  nextTick(() => {
    // 确保 DOM 已经更新
    // 绑定页面滚动事件
    window.addEventListener('scroll', scrollHandler)
  }) // nextTick
})
// created
// console.log('电梯created', props.itemInfo)
</script>

<template>
  <div class="elevator" ref="elevator" @mouseleave="hidden">
    <div class="elevator-item back-top">
      <a class="active" href="#" @click.prevent="backTop">回到顶部</a>
    </div>
    <!-- 电梯其他条目 -->
    <div
      class="elevator-item"
      :class="item.className"
      v-for="(item, index) in itemInfo"
      :key="index"
    >
      <a href="#" @click.prevent="goToBox(item.offsetTop - subHeight)">{{
        item.title
      }}</a>
    </div>
  </div>
</template>

<style lang="less">
.elevator {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 100px;
  min-height: 100px;
  // background-color: white;
  // 渐变色
  background: linear-gradient(to bottom, #c3c3c3, #666666);
  // 阴影效果(参数：垂直阴影长度，水平阴影长度，阴影颜色)
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
  border: 1px solid #000;
  border-radius: 18px;
  padding: 10px;
  .elevator-item {
    margin: 0 auto;
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    background-color: #ccc;
    border: 1px solid #000;
    border-radius: 18px;
    // 最后一个孩子
    &:last-child {
      margin-bottom: 0;
    }
    a {
      display: block;
      text-decoration: none;
      color: #333;
      line-height: 80px;
      text-align: center;
      &.active {
        color: lightseagreen;
      }
      &:hover {
        color: lightseagreen;
      }
    }
  }
}
</style>
