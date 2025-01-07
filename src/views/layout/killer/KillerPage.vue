<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getAllKillerService, getKillerByConditionService } from '@/api/killer'
import defaultAvatar from '@/assets/avatar.jpg'
import { useRouter } from 'vue-router'
const router = useRouter()
const dataList = ref([]) // 数据列表
// 表单查询参数
const formModel = ref({
  name: '',
  identity: ''
})

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

const jumpDetails = (item) => {
  console.log('jumpDetails')
  router.push({
    path: '/killer/details',
    query: {
      id: item.id
    }
  })
}

const getKillerList = async () => {
  console.log('getKillerList')
  const res = await getAllKillerService()
  console.log(res.data.data)
  dataList.value = res.data.data
}

// 搜索
const search = async () => {
  console.log('search')
  const res = await getKillerByConditionService(formModel.value)
  console.log(res)
  dataList.value = res.data.data
}
// created
getKillerList()
</script>

<template>
  <div class="survivor-page">
    <div class="header">
      <div class="text">
        <h1 style="font-size: 42px">杀手介绍</h1>
        <p>
          每个角色都有一个引人入胜的背景故事，与一组独特的能力相关联。在下面探索
          Dead by Daylight 的完整杀手和幸存者名单。
        </p>
        <div class="search">
          <div class="search-item">
            <label for="name">搜索杀手姓名</label>
            <input
              type="text"
              id="name"
              v-model="formModel.name"
              placeholder="请输入角色姓名"
              maxlength="12"
              @blur="search"
            />
            <el-icon @click="search"><Search /></el-icon>
          </div>
          <div class="search-item">
            <label for="identity">杀手身份(如:陷阱杀手)</label>
            <input
              type="text"
              id="identity"
              v-model="formModel.identity"
              placeholder="请输入杀手身份"
              maxlength="12"
              @blur="search"
            />
            <el-icon @click="search"><Search /></el-icon>
          </div>
        </div>
      </div>
      <div class="image">
        <img src="@/assets/login_bg2.jpg" alt="" />
      </div>
    </div>
    <div class="body">
      <div class="list">
        <div
          @click="jumpDetails(item)"
          @mouseenter="showCover"
          @mouseleave="notShowCover"
          class="list-item"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <img :src="item.image || defaultAvatar" alt="" />
          <div class="cover">
            <h3>{{ item.name }}</h3>
            <!-- // 超过50字符就省略+... -->
            <p v-if="item.story.length > 100">
              {{ item.story.slice(0, 100) }}...
            </p>
            <p v-else>
              {{ item.story }}
            </p>
          </div>
          <span class="top-left"></span>
          <span class="bottom-right"></span>
        </div>
        <!-- 补充div，为了最后一行靠左 -->
        <div style="width: 250px"></div>
        <div style="width: 250px"></div>
        <div style="width: 250px"></div>
        <div style="width: 250px"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.survivor-page {
  padding-top: 100px;
  min-height: 1000px;
  // 渐变色
  background: linear-gradient(to bottom, #737373, #1a1a1a);
  // 头部
  .header {
    display: flex;
    padding-left: 20px;
    width: 80%;
    background-color: #b6b6b6;
    // background-image: url(@/assets/background/fog.gif);
    margin: 0 auto;
    height: 400px;
    color: white;
    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .search {
        display: flex;
        .search-item {
          position: relative;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          margin-right: 10px;
          input {
            width: 220px;
            height: 40px;
            font-size: 16px;
            /* 边框 */
            border: 3px solid #ccc;
            /* 透明色 */
            background-color: transparent;
            /* 去掉焦点框 */
            outline: 0;
            border-radius: 10px;
            transition: all 1s;
            color: #fff;
            &::placeholder {
              font-size: 16px;
              color: #ccc;
            }
            &:focus {
              border: 3px solid #2eb7ed;
            }
            // 媒体查询，宽度小于1200px
            @media screen and (max-width: 1200px) {
              width: 200px;
            }
            // 媒体查询，宽度小于992px
            @media screen and (max-width: 992px) {
              width: 160px;
            }
          }
          .el-icon {
            position: absolute;
            top: 23px;
            right: 2px;
            height: 35px;
            width: 35px;
            // background-color: #2eb7ed;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .image {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
        border-radius: 20px;
      }
    }
  }
  // 身体
  .body {
    width: 80%;
    // background-color: #9c9c9c;
    margin: 0 auto;
    min-height: 400px;
    color: white;
    .list {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .list-item {
        position: relative;
        width: 250px;
        height: 250px;
        // background-color: pink;
        background-color: #1a1a1a;
        // 阴影
        box-shadow: 0 0 20px #ff0505;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        img {
          width: 95%;
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
    }
  }
}
</style>
