<script setup>
import { ref, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  addPropService,
  getPropByIdService,
  updatePropService
} from '@/api/prop'
import PropTypeSelect from './PropTypeSelect.vue'

// 富文本编辑器工具栏
const editorOptions = ref({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }]
    ]
  }
})

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 表单元素
const form = ref({})

// 表单验证规则
const rules = {}

// 默认数据
const defaultForm = {
  name: '',
  description: '',
  quality: '',
  image: '',
  typeId: null
}

// 准备数据
// 预览图片
const imgUrl = ref('')
// 表单数据
const formModel = ref({
  ...defaultForm
})
// 图片上传相关逻辑
const onSelectFile = (uploadFile) => {
  console.log(uploadFile)
  // 预览图片
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 用于提交
  formModel.value.image = uploadFile.raw
}

// 提交
const emit = defineEmits(['success'])
// 提交表单
const onSubmit = async () => {
  // console.log('formModel', formModel.value)
  // 普通对象 转化为 FormData
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // console.log(fd)

  // 判断是增加还是修改
  if (formModel.value.id) {
    // 修改
    // 校验
    await form.value.validate()
    await updatePropService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'edit')
  } else {
    // 添加
    // 校验
    await form.value.validate()
    await addPropService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'add')
  }
  imgUrl.value = ''
}

// 富文本编辑器对象
const editorRef = ref()

// 打开抽屉
const open = async (row) => {
  visibleDrawer.value = true // 显示抽屉
  // 有无row数据，有新增，无修改
  if (row.id) {
    // 修改
    // console.log('编辑')
    // 数据回显，先用id 查询数据
    const res = await getPropByIdService(row.id)
    // console.log(res)
    formModel.value = res.data.data
    imgUrl.value = formModel.value.image
  } else {
    // console.log('新增')
    // 重置表单
    formModel.value = { ...defaultForm }
    // 重置文件上传和富文本编辑器内容
    imgUrl.value = ''
    // nextTick 等dom渲染完毕执行回调函数
    nextTick(() => {
      editorRef.value.setHTML('')
    })
  }
}

// 暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑道具' : '新增道具'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form ref="form" :rules="rules" :model="formModel" label-width="100px">
      <el-form-item label="道具名" prop="name">
        <el-input
          v-model="formModel.name"
          placeholder="请输入道具名"
        ></el-input>
      </el-form-item>
      <el-form-item label="道具类型">
        <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
        <PropTypeSelect
          v-model="formModel.typeId"
          width="220px"
        ></PropTypeSelect>
      </el-form-item>
      <el-form-item label="道具品质" prop="quality">
        <el-select v-model="formModel.quality" :style="{ width: '220px' }">
          <!-- label是展示给用户看的，value是提交给后台的值 -->
          <el-option label="常见" value="0"></el-option>
          <el-option label="不常见" value="1"></el-option>
          <el-option label="稀少" value="2"></el-option>
          <el-option label="罕见" value="3"></el-option>
          <el-option label="超级罕见" value="4"></el-option>
          <el-option label="活动" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道具图片" prop="image">
        <!-- 此处需要关闭 element-plus自动上传，不需要配置 action 等参数 -->
        <!-- 只需要前端的本地预览即可，无需提交前上传图片 
              预览语法：URL.createObjectURL(文件对象) 创建本地预览的地址 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="道具介绍" prop="description">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.description"
            content-type="html"
            theme="snow"
            :options="editorOptions"
          ></quill-editor>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button @click="onSubmit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="less" scoped>
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    border: 1px dashed #000;
    border-radius: 20px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
