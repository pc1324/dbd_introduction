<script setup>
import KillerEdit from './components/KillerEdit.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { getKillerListService, deleteKillerService } from '@/api/killer'
import userAvator from '@/assets/default.png'
import { formatTime } from '@/utils/format'

const listData = ref([]) // 杀手列表数据
const total = ref(0) // 杀手总数
const loading = ref(false) // 控制加载效果
const selectedIds = ref([]) // 多选选中的ID
const params = ref({
  page: 1,
  pageSize: 5,
  name: '',
  identity: ''
})
const articleRef = ref() // 抽屉组件

// 获取杀手列表
const getKillerList = async () => {
  console.log(params.value)
  loading.value = true
  const res = await getKillerListService(params.value)
  console.log(res.data.data)
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
  getKillerList()
}

// 当前页变化时
const handleCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.page = page // 已经双向绑定了(可不写)
  // 基于最新数据发请求拿新数据渲染
  getKillerList()
}

// 搜索按钮 => 条件查询杀手列表
const onSearch = () => {
  params.value.page = 1 // 重置页面
  getKillerList()
}

// 重置搜索条件,清空筛选条件,重新检索,从第一页开始
const onReset = () => {
  params.value.page = 1 // 重置页面
  params.value.name = ''
  getKillerList()
}

// 删除杀手
const handleDelete = async (id) => {
  console.log(id)
  // 提示框
  await ElMessageBox.confirm('你确认要删除所选杀手吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deleteKillerService(id)
  ElMessage.success('删除成功')
  getKillerList()
}

// 添加杀手
const onAddSurvivor = () => {
  articleRef.value.open({})
}

// 编辑杀手
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
  getKillerList()
}

// created
getKillerList()
</script>

<template>
  <div class="killer-list">
    <el-card style="max-width: 100vw">
      <template #header>
        <div class="card-header">
          <span>杀手列表</span>
          <div class="btns">
            <el-button type="primary" @click="onAddSurvivor"
              >添加杀手</el-button
            >
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
        <el-form-item label="杀手姓名">
          <el-input v-model="params.name" placeholder="请输入杀手姓名" />
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="params.identity" placeholder="请输入杀手身份" />
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
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="identity" label="身份" width="180" />
        <el-table-column prop="speed" label="速度" width="180">
          <template #default="{ row }">
            {{ row.speed + 'm/s' }}
          </template>
        </el-table-column>
        <el-table-column prop="terrorRadius" label="恐惧范围" width="180">
          <template #default="{ row }">
            {{ row.terrorRadius + '米' }}
          </template>
        </el-table-column>
        <el-table-column prop="height" label="身高" width="180">
          <template #default="{ row }">
            <span v-if="row.height === '0'">矮</span>
            <span v-if="row.height === '1'">平均</span>
            <span v-if="row.height === '2'">高</span>
          </template>
        </el-table-column>
        <el-table-column prop="story" label="故事" width="180">
          <template #default="{ row }">
            <!-- row.story大于20字后省略 -->
            <span v-if="row.story.length <= 20">{{ row.story }}</span>
            <span v-else>{{ row.story.slice(0, 20) }}...</span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="杀手照片" width="180">
          <template #default="{ row }">
            <el-avatar :size="60">
              <img :src="row.image || userAvator" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatTime(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="ability" label="杀手力量" width="180">
          <template #default="{ row }">
            {{ row.ability.name }}
          </template>
        </el-table-column>
        <el-table-column prop="ability" label="力量照片" width="180">
          <template #default="{ row }">
            <el-avatar :size="60">
              <img :src="row.ability.image || userAvator" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="killerSkills" label="技能1" width="180">
          <template #default="{ row }">
            <span v-if="row.killerSkills.length <= 0">无</span>
            <span v-else>{{ row.killerSkills[0].name || '占位技能' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="killerSkills" label="技能2" width="180">
          <template #default="{ row }">
            <span v-if="row.killerSkills.length <= 0">无</span>
            <span v-else>{{ row.killerSkills[1].name || '占位技能' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="killerSkills" label="技能3" width="180">
          <template #default="{ row }">
            <span v-if="row.killerSkills.length <= 0">无</span>
            <span v-else>{{ row.killerSkills[2].name || '占位技能' }}</span>
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
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.killer-list {
  .el-card {
    .card-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
