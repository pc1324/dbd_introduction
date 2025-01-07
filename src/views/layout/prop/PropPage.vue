<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getPropListService, getPropTypeByIdService } from '@/api/prop'
import defaultAvatar from '@/assets/avatar.jpg'
import PropDetailsDialog from './components/PropDetailsDialog.vue'
import PropTypeSelect from './components/PropTypeSelect.vue'

const total = ref(0)
const dataList = ref([]) // 数据列表
const detailsDialog = ref() // 弹窗组件
// 表单查询参数
const params = ref({
  page: 1,
  pageSize: 20,
  name: '',
  quality: null,
  typeId: null
})

// 检测param.typeId变化
watch(
  () => params.value.typeId,
  (newValue) => console.log('typeId发生了变化', newValue)
)
// 检测param.quality变化
watch(
  () => params.value.quality,
  (newValue) => console.log('quality发生了变化', newValue)
)

const showCover = (e) => {
  // console.log('show')
  // console.log(e.target.children[2])
  e.target.children[1].style.opacity = 0.8
  e.target.children[2].style.borderTop = '10px solid red'
  e.target.children[2].style.borderLeft = '10px solid red'
  e.target.children[3].style.borderBottom = '10px solid red'
  e.target.children[3].style.borderRight = '10px solid red'
}

const notShowCover = (e) => {
  // console.log('notShow')
  // console.log(e.target.children[2])
  e.target.children[1].style.opacity = 0
  e.target.children[2].style.borderTop = '0'
  e.target.children[2].style.borderLeft = '0'
  e.target.children[3].style.borderBottom = '0'
  e.target.children[3].style.borderRight = '0'
}

// 跳转详情页
const jumpDetails = (item) => {
  console.log('jumpDetails', typeof item.quality)
  detailsDialog.value.open(item)
}

// 获取数据列表
const getPropListList = async () => {
  console.log('getPropListList')
  const res = await getPropListService(params.value)
  console.log(res.data.data)
  dataList.value = res.data.data.rows
  dataList.value.forEach(async (item) => {
    // 获取种类名
    // console.log(item) // 道具种类对象
    const res = await getPropTypeByIdService(item.typeId)
    // console.log(res)
    if (res.data.data !== null) {
      item.typeName = res.data.data.type
    } else {
      item.typeName = '未知'
    }
  })
  // console.log('dataList', dataList.value)
  total.value = res.data.data.total
}

// 搜索
const search = async () => {
  console.log('search')
  params.value.page = 1 // 重置页面
  getPropListList()
}

// 处理分页逻辑
// 当前页需要的数据条数变化时
const handleSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要每页条数变化,页码总数都会变,原本正在访问的当前页意义不大 => 回第一页
  params.value.page = 1
  params.value.pageSize = size // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getPropListList()
}

// 当前页变化时
const handleCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.page = page // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getPropListList()
}

// 选择盒子阴影
const chooseBoxShadow = ({ quality }) => {
  // console.log('chooseBoxShadow')
  // console.log(item)
  let boxShadow
  switch (quality) {
    case '0':
      boxShadow = '0 0 20px #000000'
      break
    case '1':
      boxShadow = '0 0 20px #ffde59'
      break
    case '2':
      boxShadow = '0 0 20px #09c502'
      break
    case '3':
      boxShadow = '0 0 20px #cc6ce7'
      break
    case '4':
      boxShadow = '0 0 20px #e4080a'
      break
    case '5':
      boxShadow = '0 0 20px #fe9900'
      break
  }

  return { boxShadow }
}
// created
getPropListList()
</script>

<template>
  <div class="prop-page">
    <div class="header">
      <div class="text">
        <h1 style="font-size: 42px">道具介绍</h1>
        <p>
          在黎明杀机中，每名逃生者都可以携带一个道具进入游戏，游戏中通过箱子之类的途径也可以获取手持道具，在下面探索
          Dead by Daylight 的完整逃生者手持道具名单。
        </p>
        <div class="search">
          <div class="search-item">
            <label for="name">搜索道具名</label>
            <input
              type="text"
              id="name"
              v-model="params.name"
              placeholder="请输入道具名"
              maxlength="12"
              @blur="search"
            />
            <el-icon @click="search"><Search /></el-icon>
          </div>
          <div class="search-item">
            <label for="identity">道具种类</label>
            <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
            <PropTypeSelect
              v-model="params.typeId"
              @update:modelValue="search"
            ></PropTypeSelect>
          </div>
        </div>
        <div class="search">
          <div class="search-item">
            <label for="identity">道具品质</label>
            <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
            <select v-model="params.quality" @change="search">
              <!-- label是展示给用户看的，value是提交给后台的值 -->
              <option label="全部" :value="null"></option>
              <option label="常见" value="0"></option>
              <option label="不常见" value="1"></option>
              <option label="稀少" value="2"></option>
              <option label="罕见" value="3"></option>
              <option label="超级罕见" value="4"></option>
              <option label="活动" value="5"></option>
            </select>
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
          :style="chooseBoxShadow(item)"
        >
          <img :src="item.image || defaultAvatar" alt="" />
          <div class="cover">
            <h3>{{ item.name }}</h3>
            <p>{{ item.typeName }}</p>
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
    <div class="footer">
      <!-- 分页区域 -->
      <!-- v-model:current-page 当前页码 -->
      <!-- v-model:page-size 每页展示条目数 -->
      <!-- :page-sizes 可供选择的[每页展示条目数] -->
      <!-- @size-change 每页展示条目数变化触发 -->
      <!-- @current-change 当前页变化触发 -->
      <!-- layou 工具栏 -->
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[20, 25, 30, 35]"
        size="large"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: center"
      />
    </div>
    <!-- 弹窗组件 -->
    <PropDetailsDialog ref="detailsDialog"></PropDetailsDialog>
  </div>
</template>

<style lang="less" scoped>
.prop-page {
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
          select {
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
            cursor: pointer;
            &:hover {
              cursor: pointer;
            }
            // 媒体查询，宽度小于1200px
            @media screen and (max-width: 1200px) {
              width: 200px;
            }
            // 媒体查询，宽度小于992px
            @media screen and (max-width: 992px) {
              width: 160px;
            }
            option {
              color: black;
              &:checked {
                background-color: #e6e6e6;
                color: rgb(98, 197, 251);
                font-weight: 700;
              }
            }
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
        box-shadow: 0 0 20px #000000;
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
            text-align: center;
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
  // 底部
  .footer {
    // 透明色
    background-color: rgba(0, 0, 0, 0);
    padding-bottom: 20px;
  }
}
</style>
