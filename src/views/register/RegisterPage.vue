<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ref } from 'vue'
import {
  registerService,
  checkUserNameService,
  checkEmailService
} from '@/api/user'
import { useRouter } from 'vue-router'
// 表单组件
const form = ref()
// 注册 => 整个用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  email: '',
  repassword: ''
})
// 整个表单的校验规则(规则不用响应式)
// 1.非空校验 request:true message:消息提示 trigger:触发时机(blur失焦 change改变)
// 2.长度校验 min:最小长度 max:最大长度
// 3.正则校验 pattern:正则规则
// 4.自定义校验 => 自己写逻辑校验(函数)
// validator : (rule, value, callback) => {}
//  (1)rule 当前校验规则相关的信息
//  (2)value 所校验的表单元素目前的表单值
//  (3)callback => 无论成功还是失败,都需要callback回调
//      - callback() 校验成功
//      - callback(new Error(错误信息)) 校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是2-10位的字符', trigger: 'blur' },
    {
      validator: async (rule, value, callback) => {
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkUserNameService(value)
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
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是6-12位的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '邮箱格式不正确，请检查输入内容',
      trigger: 'blur'
    },
    {
      validator: async (rule, value, callback) => {
        //  判断 value 和 当前 form 中收集的 password 是否一致
        try {
          const res = await checkEmailService(value)
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
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        //  判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// const register = async () => {
//   // 注册成功前,先进行校验,校验成功 => 请求,校验失败 => 自动提示
//   await form.value.validate()
//   console.log('开始注册请求')
//   await userRegisterService(formModel.value)
//   ElMessage.success('注册成功')
//   isEmailLogin.value = false
// }

const router = useRouter()

const register = async () => {
  // 登录成功前,先进行校验,校验成功 => 请求,校验失败 => 自动提示
  await form.value.validate()
  // console.log('开始登陆请求')
  console.log(formModel.value)
  await registerService(formModel.value)
  // console.log('开始登陆', res)
  ElMessage.success('注册成功')
  router.push('/login')
}

// created
</script>

<template>
  <!-- 1.结构相关 -->
  <!-- el-row 表示一行，一行分为24份 -->
  <!-- el-col 表示列 -->

  <!-- 2.校验相关 -->
  <!-- (1)el-form => :model="ruleForm" 绑定整个form数据对象 { xxx, xxx, xxx }-->
  <!-- (2)el-from => :rules="rules" 绑定整个rules校验规则对象 { xxx, xxx, xxx } -->
  <!-- (3)el-input => 表单元素 => v-model="ruleForm.xxx" 给表单项,绑定form的子属性 -->
  <!-- (4)el-from-item => prop配置生效的是哪个校验规则 -->
  <el-row class="login-page">
    <!-- 左侧:span=12份，只用背景图 -->
    <el-col :span="12" class="bg"></el-col>
    <!-- 右侧:span=3份，:offset代表在一行中，左侧的margin份数 -->
    <el-col :span="6" :offset="3" class="form">
      <!-- 用户注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <!-- 表单每一行都是el-from-item -->
        <el-form-item>
          <h1>用户注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <!-- el-input 输入框表单元素 -->
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="formModel.email"
            :prefix-icon="Message"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            style="font-weight: 700"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-link
              :underline="false"
              style="font-weight: 700"
              @click="$router.push('/login')"
            >
              ← 普通用户登录页
            </el-link>
            <el-link
              :underline="false"
              style="font-weight: 700"
              @click="$router.push('/adminLogin')"
            >
              管理员登录页 →
            </el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  // 渐变色
  background: linear-gradient(to top, #464646, #e6e6e6, #ffffff);
  // background-color: #fff;
  .bg {
    background: // url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg2.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
