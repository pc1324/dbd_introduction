<script setup>
import { ref, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  getKillerByIdService,
  addKillerService,
  updateKillerService,
  checkKillerByNameService,
  checkKillerByIdentityService,
  checkKillerByAbilityNameService
} from '@/api/killer'

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
const form = ref()

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入杀手名', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        // 如果有id，则为修改，不用这条校验
        if (formModel.value.id) {
          callback()
          return
        }
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkKillerByNameService(value)
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
  identity: [
    { required: true, message: '请输入身份', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        // 如果有id，则为修改，不用这条校验
        if (formModel.value.id) {
          callback()
          return
        }
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkKillerByIdentityService(value)
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
  ability: [
    { required: true, message: '请输入技能', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        console.log(value)

        if (value.name === '') {
          callback(new Error('力量名不能为空'))
        }
        // value.name 应当在 1- 20 字符
        if (value.name.length < 1 || value.name.length > 20) {
          callback(new Error('长度在 1 到 20 个字符'))
        }
        // 如果有id，则为修改，不用校验力量名字
        if (formModel.value.id) {
          callback()
          return
        }
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkKillerByAbilityNameService(value.name)
          console.log(res.data)
          callback()
        } catch (e) {
          console.log(e)
          callback(new Error(e.msg))
        }
      },
      trigger: 'blur'
    }
  ]
}

// 默认数据
const defaultForm = {
  name: '',
  identity: '',
  speed: '',
  terrorRadius: 0,
  height: '',
  story: '',
  image: '',
  ability: {
    name: '',
    description: '',
    image: ''
  }
}

// 准备数据
// 预览图片
const imgUrl = ref('')
const abilityImgUrl = ref('')
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

// 力量图片
const onSelectAbilityFile = (uploadFile) => {
  console.log(uploadFile)
  // 预览图片
  abilityImgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 用于提交
  formModel.value.ability.image = uploadFile.raw
}

// 提交
const emit = defineEmits(['success'])
// 提交表单
const onSubmit = async () => {
  console.log('formModel表单数据', formModel.value)
  // 普通对象 转化为 FormData
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  fd.append('abilityName', formModel.value.ability.name)
  fd.append('abilityDescription', formModel.value.ability.description)
  fd.append('abilityImage', formModel.value.ability.image)
  // console.log(fd)

  // 判断是增加还是修改
  if (formModel.value.id) {
    // 修改
    // 校验
    await form.value.validate()
    await updateKillerService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'edit')
  } else {
    // 添加
    // 校验
    await form.value.validate()
    await addKillerService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'add')
  }
  imgUrl.value = ''
}

// 富文本编辑器对象
const editorStoryRef = ref()
const editorDescriptionRef = ref()
// 打开抽屉
const open = async (row) => {
  visibleDrawer.value = true // 显示抽屉
  // 有无row数据，有新增，无修改
  if (row.id) {
    // 修改
    // console.log('编辑')
    // 数据回显，先用id 查询数据
    const res = await getKillerByIdService(row.id)
    // console.log(res)
    formModel.value = res.data.data
    imgUrl.value = formModel.value.image
    abilityImgUrl.value = formModel.value.ability.image
    // 重置文件上传和富文本编辑器内容
    nextTick(() => {
      editorStoryRef.value.setHTML(formModel.value.story)
      editorDescriptionRef.value.setHTML(formModel.value.ability.description)
    })
  } else {
    // console.log('新增')
    // 重置表单
    formModel.value = { ...defaultForm }
    // 重置文件上传和富文本编辑器内容
    imgUrl.value = ''
    abilityImgUrl.value = ''
    // nextTick 等dom渲染完毕执行回调函数
    nextTick(() => {
      editorStoryRef.value.setHTML('')
      editorDescriptionRef.value.setHTML('')
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
    :title="formModel.id ? '编辑杀手' : '新增杀手'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form ref="form" :rules="rules" :model="formModel" label-width="100px">
      <el-form-item label="角色名" prop="name">
        <el-input
          v-model="formModel.name"
          placeholder="请输入角色名"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-input
          v-model="formModel.identity"
          placeholder="请输入身份"
        ></el-input>
      </el-form-item>
      <el-form-item label="移动速度" prop="speed">
        <el-input
          v-model="formModel.speed"
          placeholder="请输入移动速度(单位m)"
        ></el-input>
      </el-form-item>
      <el-form-item label="恐惧范围" prop="terrorRadius">
        <el-input
          v-model="formModel.terrorRadius"
          placeholder="请输入恐惧范围(单位m)"
        ></el-input>
      </el-form-item>
      <el-form-item label="身高">
        <el-select v-model="formModel.height" style="width: 240px">
          <el-option label="矮" value="0"></el-option>
          <el-option label="平均" value="1"></el-option>
          <el-option label="高" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="image">
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
      <el-form-item label="故事" prop="story">
        <div class="editor">
          <quill-editor
            ref="editorStoryRef"
            v-model:content="formModel.story"
            content-type="html"
            theme="snow"
            :options="editorOptions"
          ></quill-editor>
        </div>
      </el-form-item>
      <!-- 关于杀手力量 -->
      <el-form-item label="力量名" prop="ability">
        <el-input
          v-model="formModel.ability.name"
          placeholder="请输入力量名"
        ></el-input>
      </el-form-item>
      <el-form-item label="力量图片">
        <!-- 此处需要关闭 element-plus自动上传，不需要配置 action 等参数 -->
        <!-- 只需要前端的本地预览即可，无需提交前上传图片 
              预览语法：URL.createObjectURL(文件对象) 创建本地预览的地址 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectAbilityFile"
        >
          <img v-if="abilityImgUrl" :src="abilityImgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="力量描述" prop="ability.description">
        <div class="editor">
          <quill-editor
            ref="editorDescriptionRef"
            v-model:content="formModel.ability.description"
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
