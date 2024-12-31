<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  getUserByIdService,
  updateUserService,
  addUserService
} from '@/api/user'

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 表单元素
const form = ref()

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是2-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是6-12位的非空字符',
      trigger: 'blur'
    }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        //  判断 value 是否 >0 && <200
        if (value < 0 || value > 200) {
          callback(new Error('请确保输入的年龄在0-200之间'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '邮箱格式不正确，请检查输入内容',
      trigger: 'blur'
    }
  ]
}

// 默认数据
const defaultForm = {
  username: '',
  password: '',
  age: '',
  gender: '',
  email: '',
  phone: '',
  identity: '1',
  avatar: ''
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
  formModel.value.avatar = uploadFile.raw
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
  console.log(fd)

  // 判断是增加还是修改
  if (formModel.value.id) {
    // 修改
    // 校验
    await form.value.validate()
    await updateUserService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'edit')
  } else {
    // 添加
    // 校验
    await form.value.validate()
    await addUserService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'add')
  }
  imgUrl.value = ''
}

// 打开抽屉
const open = async (row) => {
  visibleDrawer.value = true // 显示抽屉
  // 有无row数据，有新增，无修改
  if (row.id) {
    // 修改
    // console.log('编辑')
    // 数据回显，先用id 查询数据
    const res = await getUserByIdService(row.id)
    // console.log(res)
    formModel.value = res.data.data
    imgUrl.value = formModel.value.avatar
  } else {
    // console.log('新增')
    // 重置表单
    formModel.value = {
      ...defaultForm
    }
    // 重置文件上传内容
    imgUrl.value = ''
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
    :title="formModel.id ? '编辑用户' : '新增用户'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form ref="form" :rules="rules" :model="formModel" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formModel.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formModel.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model.number="formModel.age"
          placeholder="请输入年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formModel.gender" style="width: 240px">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="formModel.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <!-- 这里后台标记用户权限，就是通过中文标记的 管理员/普通用户 -->
        <el-select v-model="formModel.identity" style="width: 240px" disabled>
          <el-option label="管理员" value="0"></el-option>
          <el-option label="普通用户" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
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
</style>
