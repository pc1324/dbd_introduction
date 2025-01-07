<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSurvivorByIdService } from '@/api/survivor'
import defaultImage from '@/assets/icon/survivor-icon.png'
const route = useRoute()
const data = ref({})
const bigImage = ref()
const skills = ref([
  {
    id: 1,
    name: '技能1',
    content: '<span>技能描述</span>',
    story: ''
  },
  {
    id: 2,
    name: '技能2',
    content: '<span>技能描述</span>',
    story: ''
  },
  {
    id: 3,
    name: '技能3',
    content: '<span>技能描述</span>',
    story: ''
  }
])
const skillInfoRef = ref()
console.log(route.query)

// 改变展示的技能
const changeShow = (index) => {
  console.log(index)
  // 替换
  console.log(skills.value[index].content)
  skillInfoRef.value.innerHTML = `
  <h2 style="color: white;padding-top: 10px">${skills.value[index].name}</h2>
  <div v-html=${skills.value[index].content}</div>
  `
  bigImage.value.src = skills.value[index].imgurl
}

// 添加激活的技能
const addActive = (e) => {
  // console.log(e.target)
  e.target.children[1].style.opacity = 0.8
  e.target.children[2].style.borderTop = '5px solid red'
  e.target.children[2].style.borderLeft = '5px solid red'
  e.target.children[3].style.borderBottom = '5px solid red'
  e.target.children[3].style.borderRight = '5px solid red'
}

// 移除激活的技能
const removeActive = (e) => {
  // console.log(e.target)
  e.target.children[1].style.opacity = 0
  e.target.children[2].style.borderTop = '0'
  e.target.children[2].style.borderLeft = '0'
  e.target.children[3].style.borderBottom = '0'
  e.target.children[3].style.borderRight = '0'
}
const getSurvivorById = async () => {
  const res = await getSurvivorByIdService(route.query.id)
  console.log(res)
  data.value = res.data.data
  console.log(data.value)
  skills.value = data.value.survivorSkills
}
getSurvivorById()
</script>

<template>
  <div class="survivor-details">
    <div class="details">
      <!-- 头部 - 头像、姓名 -->
      <div class="header">
        <div class="avatar">
          <img :src="data.image || defaultImage" alt="" />
        </div>
        <div class="name">
          <div class="icon">
            <img :src="defaultImage" alt="" />
            <span>逃生者</span>
          </div>
          <h1>{{ data.name }}</h1>
        </div>
      </div>
      <!-- 身体 - 技能、故事 -->
      <div class="body">
        <div class="skill">
          <!-- 左 -->
          <div class="left">
            <h1>可传承技能</h1>
            <!-- 技能列表 -->
            <div class="skill-list">
              <div
                @click="changeShow(index)"
                @mouseenter="addActive"
                @mouseleave="removeActive"
                class="skill-list-item"
                v-for="(item, index) in data.survivorSkills"
                :key="index"
              >
                <img :src="item.imgurl || defaultImage" alt="" />
                <div class="cover">
                  <h3>{{ item.name }}</h3>
                </div>
                <span class="top-left"></span>
                <span class="bottom-right"></span>
              </div>
            </div>
            <!-- 技能信息 -->
            <div ref="skillInfoRef" class="skill-info">
              <h2 style="color: white">{{ skills[0].name }}</h2>
              <div v-html="skills[0].content"></div>
            </div>
          </div>
          <!-- 右 -->
          <div class="right">
            <div class="show">
              <img
                ref="bigImage"
                :src="skills[0].imgurl || defaultImage"
                alt=""
              />
              <span class="top-left"></span>
              <span class="bottom-right"></span>
            </div>
          </div>
        </div>
        <div class="story">
          <div class="left">
            <div class="image">
              <img src="@/assets/home/dbd-introduction04.webp" alt="" />
            </div>
          </div>
          <div class="right">
            <h1>{{ data.name }}的故事</h1>
            <div class="content" v-html="data.story"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.survivor-details {
  padding-top: 100px;
  min-height: 1000px;
  // 渐变色
  background: linear-gradient(to bottom, #737373, #1a1a1a);
  .details {
    width: 80%;
    margin: 0 auto;
    min-height: 1000px;
    // background-color: #ccc;
    // 头部
    .header {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 300px;
      // background-color: pink;
      .avatar {
        width: 300px;
        text-align: right;
        // background-color: white;
        img {
          height: 100%;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
      }
      .name {
        width: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // 渐变色
        background: linear-gradient(135deg, #76c7fd, #199df5, #0d44bb);
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        color: white;
        .icon {
          display: flex;
          width: 300px;
          height: 150px;
          img {
            width: 150px;
          }
          span {
            font-size: 42px;
            line-height: 150px;
          }
        }
        h1 {
          font-size: 42px;
        }
      }
    }
    // 身体
    .body {
      padding-top: 20px;
      width: 100%;
      // min-height: 500px;
      // background-color: #76c7fd;
      // 技能
      .skill {
        display: flex;
        margin-bottom: 30px;
        h1 {
          font-size: 42px;
          color: white;
        }
        .left {
          flex: 1;
          // 技能列表
          .skill-list {
            display: flex;
            justify-content: space-around;
            padding-top: 20px;
            .skill-list-item {
              position: relative;
              width: 100px;
              height: 100px;
              // 透明色
              background-color: rgba(71, 71, 71, 0.6);
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 100%;
              }
              .cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                opacity: 0;
                transition: all 0.5s;
                cursor: pointer;
                padding-top: 40px;
                h3 {
                  text-align: center;
                  color: white;
                }
              }
              span {
                position: absolute;
                width: 50px;
                height: 50px;
                transition: all 0.5s;
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
          }
          // 技能信息
          .skill-info {
            padding-top: 10px;
            h2 {
              padding-top: 10px;
              color: white;
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          justify-content: center;
          // align-items: start;
          // background-color: pink;
          height: 300px;
          .show {
            position: relative;
            width: 300px;
            height: 300px;
            background-color: rgba(71, 71, 71, 0.8);

            img {
              width: 100%;
            }
            span {
              position: absolute;
              width: 50px;
              height: 50px;
              &.top-left {
                top: 0;
                left: 0;
                border-top: 10px solid red;
                border-left: 10px solid red;
              }
              &.bottom-right {
                bottom: 0;
                right: 0;
                border-bottom: 10px solid red;
                border-right: 10px solid red;
              }
            }
          }
        }
      }
      // 故事
      .story {
        border: 5px solid #000;
        min-height: 500px;
        width: 100%;
        // background-color: #e49393;
        display: flex;
        color: #fff;
        // 左
        .left {
          flex: 1;
          // background-color: rgb(61, 61, 61);
          display: flex;
          justify-content: center;
          // opacity: 0.8;
          .image {
            width: 300px;
            height: 300px;
            // background-color: pink;
            img {
              width: 100%;
            }
          }
        }
        // 右
        .right {
          flex: 1;
          width: 100px;
          background-color: rgb(17, 17, 17);
          h1 {
            padding: 50px;
            font-size: 42px;
            text-align: center;
          }
          div.content {
            padding: 0 50px 50px 50px;
          }
        }
      }
    }
  }
}
</style>
