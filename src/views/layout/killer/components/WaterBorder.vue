<script setup>
import defaultAvatar from '@/assets/avatar.jpg'

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        id: 1,
        name: '埃文·迈克米伦',
        identity: '陷阱杀手',
        speed: 4.6,
        terrorRadius: 32,
        height: '1',
        story:
          '<p><em>埃文·迈克米伦把自己的父亲当作偶像。并不只是因为</em><a href="https://deadbydaylight.fandom.com/zh/wiki/%E9%98%BF%E5%A5%87%E9%BA%A6%E5%85%8B%E7%B1%B3%E5%85%B0" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><em>父亲</em></a><em>能给他留下一笔巨大的财富，同时也因为崇拜父亲经营企业的手段高明。在严厉的管教下长大，埃文学会了父亲的铁腕经营手段。迈克米伦庄园的产能居高不下，在父子的联手打理下企业也是蒸蒸日上。父亲阿尔奇·迈克米伦的心理状况随着年龄增长逐渐失去​​正常的理智，埃文保护着家产不受外人侵占。无论父亲提出什么样的要求，他都照做。</em></p><p><em>完全失去理智后的阿尔奇·迈克米伦让埃文成了史上最重大屠杀案的实施者。有消息传出埃文把100多人骗进了黑暗的矿洞，引爆了炸药，将他们的灵魂永远尘封在了地下。&nbsp;</em><a href="https://deadbydaylight.fandom.com/zh/wiki/%E8%BF%88%E5%85%8B%E7%B1%B3%E4%BC%A6%E5%BA%84%E5%9B%AD" rel="noopener noreferrer" target="_blank" style="color: var(--theme-link-color);"><em>迈克米伦庄园</em></a><em>的故事讲述的是一对父子因为权力和金钱而误入歧途的故事。具体有多少受害者死在他们手下是未知的。没有纪录记载埃文·迈克米伦是怎样演变成这样的。而他的父亲被发现横死在自家仓库的地下室里，但这就是另一个谜题了。</em></p>',
        image:
          'https://dbd-introduction.oss-cn-hangzhou.aliyuncs.com/killerAvatar/78bd5459-f045-4a7e-9aed-0e34ef292551.png',
        ability: null,
        killerSkills: null,
        createTime: '2024-11-18T20:20:40',
        updateTime: '2025-01-04T22:04:53'
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
    background-image: conic-gradient(transparent, #ff0707, transparent 30%);
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
