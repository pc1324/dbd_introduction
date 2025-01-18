<script setup>
import defaultAvatar from '@/assets/avatar.jpg'

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        id: 1,
        name: '德怀特·费菲尔德',
        gender: '0',
        story:
          '<p>高中时的德怀特是一个精通计算机的死宅。他一心想成为学校里最酷的孩子之一，可他偏偏没有那种魅力。他试着加入了足球队却被踢了出去，篮球队更是压根没考虑过他，他的学习成绩也明显低于平均分。\r\n\r\n在一次公司周末活动中，他的老板在八卦他的家事之前把他们带进了森林深处。第二天醒来时德怀特发现自己孤身一人，只记得自己喝了一口酒。\r\n\r\n原来他在夜里被大家抛弃在了树林里。作为圈内笑柄的德怀特又一次被迫独自寻找走出森林的路。但那次活动却是大家最后一次见到德怀特·费菲尔德了。\r\n\r\n德怀特并不是当人们提到 "逃生者" 时你所想起的典型印象。他缺少那种特殊的活泼风度，并且他在不戴眼镜的情况下几乎看不见任何东西。但当太阳落山，树林活跃起来，德怀特就会开始他那像老鼠一般谨慎小心的生活，以确保他能活着见到明天的太阳，虽然一些无法想象的事情正在他身上发生。德怀特永远不会停下。无论如何，他都会生存下去。当别人在高中竭尽所能表现自己，他却尽力让自己不被注意到。他并不在乎危险是在走廊里，还是在树林中。当别的同伴在恐惧降临时感到不安，他却能利用自己在青少年时代学到的经验。风水轮流转，现在别人如果需要生存下去，他们就需要遵从德怀特的坚定指示，因为他知道如何隐藏自己。</p>',
        image:
          'https://dbd-introduction.oss-cn-hangzhou.aliyuncs.com/survivorAvatar/eaf2a198-896f-4365-a81f-d8411e63d373.png',
        createTime: '2024-11-25T15:13:21',
        updateTime: '2025-01-04T03:00:49',
        survivorSkills: null
      }
    }
  },
  jumpDetails: {
    type: Function,
    default: () => {
      return () => {}
    }
  }
})
console.log('数据', props.value)

const showCover = (e) => {
  console.log('show')
  // console.log(e.target.children[2])
  e.target.children[1].style.opacity = 0.8
  e.target.children[2].style.borderTop = '10px solid red'
  e.target.children[2].style.borderLeft = '10px solid red'
  e.target.children[3].style.borderBottom = '10px solid red'
  e.target.children[3].style.borderRight = '10px solid red'
}

const notShowCover = (e) => {
  console.log('notShow')
  // console.log(e.target.children[2])
  e.target.children[1].style.opacity = 0
  e.target.children[2].style.borderTop = '0'
  e.target.children[2].style.borderLeft = '0'
  e.target.children[3].style.borderBottom = '0'
  e.target.children[3].style.borderRight = '0'
}
</script>

<template>
  <div
    @click="jumpDetails(item)"
    @mouseenter="showCover"
    @mouseleave="notShowCover"
    class="water-border"
  >
    <img :src="item.image || defaultAvatar" alt="" />
    <div class="cover">
      <h3>{{ item.name }}</h3>
      <!-- // 超过50字符就省略+... -->
      <p v-if="item.story.length > 100">{{ item.story.slice(0, 100) }}...</p>
      <p v-else>
        {{ item.story }}
      </p>
    </div>

    <span class="top-left"></span>
    <span class="bottom-right"></span>
  </div>
</template>

<style lang="less" scoped>
/* 流水灯边框 */
.water-border {
  width: 250px;
  height: 250px;
  /* 超出父盒子部分隐藏 */
  overflow: hidden;
  /* 背景颜色 */
  background-color: #000;
  /* 撑开父盒子大小 */
  padding: 10px;
  /* 小圆角 */
  border-radius: 20px;
  /* 字体颜色、盒子阴影 */
  color: #fff;
  // box-shadow: 0 0 20px #50bcf2;
  /* 简单定位 */
  position: relative;
  /* 显示层级最上层 */
  z-index: 0;
  /* 业务需求 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  &::before {
    content: '';
    /* 宽高要超过父级默默人的大小 */
    width: 200%;
    height: 200%;
    /* 基础背景颜色 */
    background-color: #22292f;
    /* conic-gradient 围绕中心点旋转的渐变 */
    background-image: conic-gradient(transparent, #66fff7, transparent 30%);
    /* 定位到中间 */
    position: absolute;
    left: -50%;
    top: -50%;
    /* 显示层级最底层 */
    z-index: -2;
    /* 旋转整个灯光渐变这一层 */
    animation: rotate 5s linear infinite;
  }
  &::after {
    content: '';
    /* 在内撑开盒子宽高，正好小一圈左边框 */
    /* inset简写属性，相当于top、right、bottom、left */
    inset: 5px;
    /* top: 1vmin;
    right: 1vmin;
    bottom: 1vmin;
    left: 1vmin; */
    border-radius: 20px;
    background-color: #000;

    position: absolute;
    z-index: -1;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 10px;
    opacity: 0;
    transition: all 0.5s;
    cursor: pointer;
    padding-top: 40px;
    h3 {
      text-align: center;
    }
    p {
      padding: 10px;
    }
  }
  span {
    position: absolute;
    width: 50px;
    height: 50px;
    transition: all 0.5s;
    cursor: pointer;
    &.top-left {
      top: 0;
      left: 0;
      // border-top: 10px solid red;
      // border-left: 10px solid red;
    }
    &.bottom-right {
      bottom: 0;
      right: 0;
      // border-bottom: 10px solid red;
      // border-right: 10px solid red;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
