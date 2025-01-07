<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getKillerSkillListService, getKillerByIdService } from '@/api/killer'
import defaultAvatar from '@/assets/avatar.jpg'
import OwnerSelect from './component/OwnerSelect.vue'
import DetailsDialog from './component/SkillDetails.vue'

const total = ref(0)
const dataList = ref([]) // 数据列表
const detailsDialog = ref() // 弹窗组件
// 表单查询参数
const params = ref({
  page: 1,
  pageSize: 20,
  name: '',
  killerId: null
})

// 检测param.killerId变化
watch(
  () => params.value.killerId,
  (newValue) => console.log('killerId发生了变化', newValue)
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
  console.log('jumpDetails')
  detailsDialog.value.open(item)
}

// 获取数据列表
const getKillerSkillList = async () => {
  console.log('getKillerSkillList')
  const res = await getKillerSkillListService(params.value)
  console.log(res.data.data)
  dataList.value = res.data.data.rows
  dataList.value.forEach(async (item) => {
    // 获取所有者姓名
    // console.log(item) // 杀手对象
    const res = await getKillerByIdService(item.killerId)
    // console.log(res)
    if (res.data.data !== null) {
      item.killerName = res.data.data.name
    } else {
      item.killerName = '通用技能'
    }
  })
  // console.log('dataList', dataList.value)
  total.value = res.data.data.total
}

// 搜索
const search = async () => {
  console.log('search')
  params.value.page = 1 // 重置页面
  getKillerSkillList()
}

// 处理分页逻辑
// 当前页需要的数据条数变化时
const handleSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要每页条数变化,页码总数都会变,原本正在访问的当前页意义不大 => 回第一页
  params.value.page = 1
  params.value.pageSize = size // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getKillerSkillList()
}

// 当前页变化时
const handleCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.page = page // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getKillerSkillList()
}

// created
getKillerSkillList()
</script>

<template>
  <div class="skill-killer-page">
    <div class="header">
      <div class="text">
        <h1 style="font-size: 42px">杀手技能介绍</h1>
        <p>
          每个角色都有三个传承技能，每场游戏每个玩家可以最多携带四个技能，在下面探索
          Dead by Daylight 的完整技能名单。
        </p>
        <div class="search">
          <div class="search-item">
            <label for="name">搜索技能名</label>
            <input
              type="text"
              id="name"
              v-model="params.name"
              placeholder="请输入技能名"
              maxlength="12"
              @blur="search"
            />
            <el-icon @click="search"><Search /></el-icon>
          </div>
          <div class="search-item">
            <label for="identity">所有者</label>
            <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
            <OwnerSelect
              v-model="params.killerId"
              ownerList="killer"
              width="220px"
              @update:modelValue="search"
            ></OwnerSelect>
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
          <img :src="item.imgurl || defaultAvatar" alt="" />
          <div class="cover">
            <h3>{{ item.name }}</h3>
            <p>{{ item.killerName }}</p>
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
    <DetailsDialog ref="detailsDialog"></DetailsDialog>
  </div>
</template>

<style lang="less" scoped>
.skill-killer-page {
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
        box-shadow: 0 0 20px #50bcf2;
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
