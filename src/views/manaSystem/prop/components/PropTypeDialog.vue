<script setup>
import { ref } from 'vue'
import {
  addPropTypeService,
  deletePropTypeService,
  getAllPropTypeService,
  getPropTypeByIdService,
  updatePropTypeService
} from '@/api/prop'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { watch } from 'vue'
// 数据
const listData = ref([]) // 列表数据
const selectedIds = ref([]) // 获取选中的ID
const dialogVisible = ref(false) // 弹窗显示控制
const dialogSonVisible = ref(false) // 弹出子弹窗
const title = ref() // 子弹框标题
const params = ref({
  type: ''
})
const defaultParams = {
  type: ''
}
// params.value.type不为''时候解除按钮禁用，否则禁用
const submitFlag = ref(true)
watch(
  () => params.value.type,
  (newValue) => {
    if (newValue !== '') {
      submitFlag.value = false
    } else {
      submitFlag.value = true
    }
    console.log('submitFlag', submitFlag.value)
  }
)
// 获取多选选择的ID
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map((row) => row.id)
  // console.log('Selected IDs:', selectedIds.value)
}

// 打开弹框方法
const open = () => {
  dialogVisible.value = true
  getAllPropType()
}

// 弹出子消息框方法
const onAddSonDialog = async (row) => {
  dialogSonVisible.value = true
  if (row.id) {
    // console.log('编辑')
    title.value = '编辑'
    const res = await getPropTypeByIdService(row.id)
    params.value = res.data.data
  } else {
    // console.log('新增')
    title.value = '添加'
    params.value = { ...defaultParams }
  }
}

const emit = defineEmits(['flushed'])
// 提交
const onSubmit = async () => {
  // console.log(params.value)
  // 判断是增加还是修改
  if (params.value.id) {
    // 修改
    await updatePropTypeService(params.value)
    ElMessage.success('修改成功')
    dialogSonVisible.value = false
    getAllPropType()
  } else {
    // 添加
    await addPropTypeService(params.value)
    ElMessage.success('添加成功')
    dialogSonVisible.value = false
    getAllPropType()
  }
}

// 删除
const handleDelete = async (id) => {
  console.log(id)
  // 提示框
  await ElMessageBox.confirm('你确认要删除所选道具吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deletePropTypeService(id)
  ElMessage.success('删除成功')
  getAllPropType()
}
// 获取所有种类
const getAllPropType = async () => {
  const res = await getAllPropTypeService()
  // console.log(res)
  listData.value = res.data.data
}

// 暴露方法
defineExpose({
  open
})

// 弹框关闭后提醒父组件调用刷新数据
watch(
  () => dialogVisible.value,
  (newValue) => {
    // console.log(newValue)
    // console.log(oldValue)
    if (newValue === false) {
      emit('flushed')
    }
  }
)

// created
getAllPropType()
</script>

<template>
  <el-dialog v-model="dialogVisible" title="道具种类管理" width="40vw">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">道具种类管理</h4>
        <div class="btns">
          <el-button type="primary" @click="onAddSonDialog"
            >添加道具种类</el-button
          >
          <el-button type="danger" @click="handleDelete(selectedIds)"
            >批量删除</el-button
          >
        </div>
      </div>
    </template>
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
      <el-table-column prop="type" label="道具类型" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            type="primary"
            plain
            @click="onAddSonDialog(row)"
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
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 子对话框 -->
  <el-dialog v-model="dialogSonVisible" :title="title" width="40vw">
    <div class="son-dialog-content">
      <el-form inline>
        <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
        <el-form-item label="道具种类">
          <el-input v-model="params.type" placeholder="请输入道具种类" />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="submitFlag" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogSonVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.my-header {
  display: flex;
  justify-content: space-between;
}

.son-dialog-content {
  display: flex;
  justify-content: center;
}
</style>
