<script setup>
import MapEdit from './components/MapEdit.vue'
import MapSeriesSelect from './components/MapSeriesSelect.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { getMapListService, deleteMapService } from '@/api/map'
import userAvator from '@/assets/default.png'

const listData = ref([]) // 地图列表数据
const total = ref(0) // 地图总数
const loading = ref(false) // 控制加载效果
const selectedIds = ref([]) // 多选选中的ID
const mapSeriesSelectRef = ref() // 地图系列选择器组件
const params = ref({
  page: 1,
  pageSize: 5,
  name: '',
  series: ''
})
const articleRef = ref() // 抽屉组件

// 获取地图列表
const getMapList = async () => {
  console.log('查询参数', params.value)
  loading.value = true
  const res = await getMapListService(params.value)
  console.log('地图列表', res.data.data)
  listData.value = res.data.data.rows
  total.value = res.data.data.total
  loading.value = false
}

// 处理分页逻辑
// 当前页需要的数据条数变化时
const handleSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要每页条数变化,页码总数都会变,原本正在访问的当前页意义不大 => 回第一页
  params.value.page = 1
  params.value.pageSize = size // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getMapList()
}

// 当前页变化时
const handleCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.page = page // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getMapList()
}

// 搜索按钮 => 条件查询地图列表
const onSearch = () => {
  params.value.page = 1 // 重置页面
  getMapList()
}
// 重置搜索条件,清空筛选条件,重新检索,从第一页开始
const onReset = () => {
  params.value.page = 1 // 重置页面
  params.value.name = ''
  params.value.series = ''
  getMapList()
}

// 删除地图
const handleDelete = async (id) => {
  console.log(id)
  // 提示框
  await ElMessageBox.confirm('你确认要删除所选地图吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deleteMapService(id)
  ElMessage.success('删除成功')
  getMapList()

  // 选择器列表刷新
  mapSeriesSelectRef.value.getAllMapSeries()
}

// 添加地图
const onAddUser = () => {
  articleRef.value.open({})
}

// 编辑地图
const handleEdit = (row) => {
  articleRef.value.open(row)
}

// 获取多选选择的ID
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map((row) => row.id)
  // console.log('Selected IDs:', selectedIds.value)
}

// 编辑/新增 成功后
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pageSize)
    // 更新成最大页码，再渲染
    params.value.page = lastPage
  }
  // 如果是编辑，最好渲染当前页
  getMapList()
  // 选择器列表刷新
  mapSeriesSelectRef.value.getAllMapSeries()
}

// created
getMapList()
</script>

<template>
  <div class="map-list">
    <el-card style="max-width: 100vw">
      <template #header>
        <div class="card-header">
          <span>地图列表</span>
          <div class="btns">
            <el-button type="primary" @click="onAddUser">添加地图</el-button>
            <el-button type="danger" @click="handleDelete(selectedIds)"
              >批量删除</el-button
            >
          </div>
        </div>
      </template>
      <!-- 默认插槽 default -->
      <!-- 表单 -->
      <el-form inline>
        <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
        <el-form-item label="地图名">
          <el-input v-model="params.username" placeholder="请输入地图名" />
        </el-form-item>
        <el-form-item label="地图系列">
          <MapSeriesSelect
            ref="mapSeriesSelectRef"
            v-model="params.series"
          ></MapSeriesSelect>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <!-- @selection-change="handleSelectionChange" 选择改变，传递选中行数据 -->
      <el-table
        v-loading="loading"
        @selection-change="handleSelectionChange"
        v-if="true"
        :data="listData"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="地图名" width="180" />
        <el-table-column prop="description" label="地图介绍" width="500" />
        <el-table-column prop="series" label="地图系列" width="180" />
        <el-table-column prop="image" label="图片" width="180">
          <template #default="{ row }">
            <el-avatar :size="60">
              <img :src="row.image || userAvator" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button
              :icon="Edit"
              circle
              type="primary"
              plain
              @click="handleEdit(row)"
            >
            </el-button>
            <el-button
              :icon="Delete"
              circle
              type="danger"
              plain
              @click="handleDelete(row.id)"
            >
            </el-button>
          </template>
        </el-table-column>
        <!-- 空状态处理 -->
        <template #empty>
          <el-empty description="没有数据"></el-empty>
        </template>
      </el-table>
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
        :page-sizes="[3, 5, 8, 10]"
        size="large"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      />

      <!-- 抽屉组件 -->
      <MapEdit ref="articleRef" @success="onSuccess"></MapEdit>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.map-list {
  .el-card {
    .card-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
