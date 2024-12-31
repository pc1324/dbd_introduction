<script setup>
import PropTypeSelect from './components/PropTypeSelect.vue'
import PropTypeDialog from './components/PropTypeDialog.vue'
import KillerEdit from './components/PropEdit.vue'
import { ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  getPropListService,
  getPropTypeByIdService,
  deletePropService
} from '@/api/prop'
import userAvator from '@/assets/default.png'

const listData = ref([]) // 道具列表数据
const total = ref(0) // 道具总数
const loading = ref(false) // 控制加载效果
const selectedIds = ref([]) // 多选选中的ID

const params = ref({
  page: 1,
  pageSize: 5,
  name: '',
  quality: null,
  typeId: null
})
const articleRef = ref() // 抽屉组件
const dialogRef = ref() // 对话框组件

// 检测param.typeId变化
watch(
  () => params.value.typeId,
  (newValue) => console.log('typeId发生了变化', newValue)
)

// 获取道具技能列表
const getPropList = async () => {
  // console.log(params.value)
  loading.value = true
  // 获取道具技能列表
  const res = await getPropListService(params.value)
  console.log(res.data.data)
  listData.value = res.data.data.rows
  listData.value.forEach(async (item) => {
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
  // console.log('listData', listData.value)
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
  getPropList()
}

// 当前页变化时
const handleCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.page = page // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getPropList()
}

// 搜索按钮 => 条件查询道具列表
const onSearch = () => {
  params.value.page = 1 // 重置页面
  getPropList()
}

// 重置搜索条件,清空筛选条件,重新检索,从第一页开始
const onReset = () => {
  params.value.page = 1 // 重置页面
  params.value.name = ''
  params.value.quality = null
  params.value.typeId = null
  getPropList()
}

// 删除道具
const handleDelete = async (id) => {
  console.log(id)
  // 提示框
  await ElMessageBox.confirm('你确认要删除所选道具吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deletePropService(id)
  ElMessage.success('删除成功')
  getPropList()
}
// 打开对话框
const openPropTypeDialog = () => {
  dialogRef.value.open()
}
// 添加道具
const onAddProp = () => {
  articleRef.value.open({})
}

// 编辑道具
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
  getPropList()
}

// created
getPropList()
</script>

<template>
  <div class="prop-list">
    <el-card style="max-width: 100vw">
      <template #header>
        <div class="card-header">
          <span>道具列表</span>
          <div class="btns">
            <el-button type="primary" @click="openPropTypeDialog"
              >道具种类管理</el-button
            >
            <el-button type="primary" @click="onAddProp">添加道具</el-button>
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
        <el-form-item label="道具名">
          <el-input v-model="params.name" placeholder="请输入道具名" />
        </el-form-item>
        <el-form-item label="道具种类">
          <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
          <PropTypeSelect
            v-model="params.typeId"
            width="220px"
          ></PropTypeSelect>
        </el-form-item>
        <el-form-item label="道具品质" prop="quality">
          <el-select v-model="params.quality" :style="{ width: '220px' }">
            <!-- label是展示给用户看的，value是提交给后台的值 -->
            <el-option label="常见" value="0"></el-option>
            <el-option label="不常见" value="1"></el-option>
            <el-option label="稀少" value="2"></el-option>
            <el-option label="罕见" value="3"></el-option>
            <el-option label="超级罕见" value="4"></el-option>
            <el-option label="活动" value="5"></el-option>
          </el-select>
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
        <el-table-column prop="name" label="道具名" width="180" />
        <el-table-column prop="description" label="道具描述" width="500">
          <template #default="{ row }">
            <span v-html="row.description"></span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="图片" width="180">
          <template #default="{ row }">
            <el-avatar :size="60">
              <img :src="row.image || userAvator" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="quality" label="品质" width="180">
          <template #default="{ row }">
            <span v-if="row.quality === '0'">常见</span>
            <span v-if="row.quality === '1'">不常见</span>
            <span v-if="row.quality === '2'">稀有</span>
            <span v-if="row.quality === '3'">罕见</span>
            <span v-if="row.quality === '4'">非常稀有</span>
            <span v-if="row.quality === '5'">活动</span>
          </template>
        </el-table-column>
        <el-table-column label="道具种类" width="180">
          <template #default="{ row }">
            <span v-html="row.typeName"></span>
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
      <KillerEdit ref="articleRef" @success="onSuccess"></KillerEdit>
      <!-- 对话框 -->
      <PropTypeDialog ref="dialogRef" @flushed="onSuccess"></PropTypeDialog>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.prop-list {
  .el-card {
    .card-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
