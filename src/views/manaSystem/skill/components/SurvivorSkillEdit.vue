<script setup>
import { ref, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  getSkillByIdService,
  addSkillService,
  updateSkillService,
  checkSurvivorSkillByName
} from '@/api/survivor'
import OwnerSelect from './OwnerSelect.vue'

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
const rules = {
  name: [
    { required: true, message: '请输入技能名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkSurvivorSkillByName(value)
          console.log(res.data)
          callback()
        } catch (e) {
          console.log(e)
          callback(new Error(e.msg))
        }
      },
      trigger: 'blur'
    }
  ],
  survivorId: [{ required: true, message: '请选择逃生者', trigger: 'change' }]
}

// 默认数据
const defaultForm = {
  name: '',
  content: '',
  imgurl: '',
  survivorId: null
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
  formModel.value.imgurl = uploadFile.raw
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
    await updateSkillService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'edit')
  } else {
    // 添加
    // 校验
    await form.value.validate()
    await addSkillService(fd)
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
    const res = await getSkillByIdService(row.id)
    // console.log(res)
    formModel.value = res.data.data
    imgUrl.value = formModel.value.imgurl
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
    :title="formModel.id ? '编辑技能' : '新增技能'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form ref="form" :rules="rules" :model="formModel" label-width="100px">
      <el-form-item label="技能名" prop="name">
        <el-input
          v-model="formModel.name"
          placeholder="请输入技能名"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属逃生者" prop="survivorId">
        <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
        <OwnerSelect
          v-model="formModel.survivorId"
          ownerList="survivor"
          width="220px"
        ></OwnerSelect>
      </el-form-item>
      <el-form-item label="技能图片" prop="imgurl">
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
      <el-form-item label="技能介绍" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.content"
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
