<script setup>
// 组合式 API 部分
import { ref } from 'vue'
import { Edit, Check } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import {
  updateUserInfoService,
  checkUserNameService,
  checkEmailService
} from '@/api/user'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
// 准备数据
// 预览图片
const imgUrl = ref('')
const editStatus = ref({
  editName: false,
  editAge: false,
  editGender: false,
  editEmail: false,
  editPhone: false,
  editPassword: false
})

// 是否通过校验
const passCheck = ref({
  username: true,
  age: true,
  email: true,
  phone: true,
  password: true
})

// 获取用户信息
const getUserInfo = async () => {
  console.log('getUserInfo')
  await userStore.getUser()
  imgUrl.value = user.value.avatar
}
// 更新用户信息
const updateUserInfo = async (attribute) => {
  console.log('updateUserInfo')
  if (!passCheck.value.username) {
    return
  }
  if (!passCheck.value.age) {
    return
  }
  if (!passCheck.value.email) {
    return
  }
  if (!passCheck.value.phone) {
    return
  }
  if (!passCheck.value.password) {
    return
  }
  if (attribute === 'editName') {
    editStatus.value.editName = false
  } else if (attribute === 'editAge') {
    editStatus.value.editAge = false
  } else if (attribute === 'editGender') {
    editStatus.value.editGender = false
  } else if (attribute === 'editEmail') {
    editStatus.value.editEmail = false
  } else if (attribute === 'editPhone') {
    editStatus.value.editPhone = false
  } else if (attribute === 'editPassword') {
    editStatus.value.editPassword = false
  }
  // 普通对象 转化为 FormData
  const fd = new FormData()
  for (let key in user.value) {
    fd.append(key, user.value[key])
  }
  console.log(fd)
  // 更新用户信息请求
  await updateUserInfoService(fd)
  ElMessage.success('更新成功')
}

// 图片上传相关逻辑
const onSelectFile = (uploadFile) => {
  console.log(uploadFile)
  // 预览图片
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 用于提交
  user.value.avatar = uploadFile.raw
}

// 提示
const usernameTip = ref('usernameTip')
const ageTip = ref('ageTip')
const emailTip = ref('emailTip')
const phoneTip = ref('phoneTip')
const passwordTip = ref('passwordTip')

// 校验类函数
// 校验用户名
const checkUsername = async () => {
  // console.log(user.value.username.length)
  if (user.value.username.length < 2 || user.value.username.length > 10) {
    usernameTip.value.innerHTML = '用户名长度在 2 到 10 个字符之间'
    passCheck.value.username = false
  } else {
    try {
      await checkUserNameService(user.value.username)
      // console.log(res.data)
      usernameTip.value.innerHTML = ''
      passCheck.value.username = true
    } catch (e) {
      // console.log(e)
      usernameTip.value.innerHTML = e.msg
      passCheck.value.username = false
    }
  }
}
// 校验年龄
const checkAge = () => {
  if (user.value.age.length === 0) {
    ageTip.value.innerHTML = '请输入年龄'
    passCheck.value.age = false
  } else if (!/^\d+$/.test(user.value.age)) {
    ageTip.value.innerHTML = '只能输入数字'
    passCheck.value.age = false
  } else if (user.value.age < 0 || user.value.age > 200) {
    ageTip.value.innerHTML = '年龄在 0 到 200 之间'
    passCheck.value.age = false
  } else {
    ageTip.value.innerHTML = ''
    passCheck.value.age = true
  }
}
// 校验邮箱
const checkEmail = async () => {
  if (user.value.email.length === 0) {
    emailTip.value.innerHTML = '请输入邮箱'
    passCheck.value.email = false
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.value.email)
  ) {
    emailTip.value.innerHTML = '请输入正确的邮箱'
    passCheck.value.email = false
  } else {
    try {
      await checkEmailService(user.value.email)
      emailTip.value.innerHTML = ''
      passCheck.value.email = true
    } catch (e) {
      emailTip.value.innerHTML = e.msg
      passCheck.value.email = false
    }
  }
}

// 校验手机号
const checkPhone = () => {
  if (user.value.phone.length === 0) {
    phoneTip.value.innerHTML = '请输入手机号'
    passCheck.value.phone = false
  } else if (!/^1[3-9]\d{9}$/.test(user.value.phone)) {
    phoneTip.value.innerHTML = '请输入正确的手机号'
    passCheck.value.phone = false
  } else {
    phoneTip.value.innerHTML = ''
    passCheck.value.phone = true
  }
}

// 校验密码
const checkPassword = () => {
  if (user.value.password.length === 0) {
    passwordTip.value.innerHTML = '请输入密码'
    passCheck.value.password = false
  } else if (!/^\S{6,12}$/.test(user.value.password)) {
    passwordTip.value.innerHTML = '密码必须是6-12位的非空字符'
    passCheck.value.password = false
  } else {
    passwordTip.value.innerHTML = ''
    passCheck.value.password = true
  }
}
// created
console.log(user.value)
getUserInfo()
</script>

<template>
  <div class="user-page">
    <!-- 用户信息展示组件 -->
    <div class="user-info-container">
      <h2>用户信息</h2>

      <!-- 头像展示框 -->
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
      <div class="btns">
        <el-button @click="updateUserInfo('editAvatar')" type="success"
          >修改头像</el-button
        >
      </div>
      <!-- 用户信息部分 -->
      <div class="user-info">
        <!-- 姓名 -->
        <div class="user-info-item">
          <div class="attribute">姓名:</div>
          <div class="value" v-if="!editStatus.editName">
            {{ user.username }}
          </div>
          <div class="value" v-else>
            <el-input
              @change="checkUsername"
              type="text"
              v-model="user.username"
              style="width: 200px"
            /><el-button
              class="check-button"
              @click="updateUserInfo('editName')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <span class="tip" ref="usernameTip"></span>
          <el-button
            class="edit-button"
            @click="editStatus.editName = !editStatus.editName"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <!-- 年龄 -->
        <div class="user-info-item">
          <div class="attribute">年龄:</div>
          <div class="value" v-if="!editStatus.editAge">
            {{ user.age }}
          </div>
          <div class="value" v-else>
            <el-input
              @change="checkAge"
              type="text"
              v-model="user.age"
              style="width: 200px"
            /><el-button
              class="check-button"
              @click="updateUserInfo('editAge')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <span class="tip" ref="ageTip"></span>
          <el-button
            class="edit-button"
            @click="editStatus.editAge = !editStatus.editAge"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <!-- 性别 -->
        <div class="user-info-item">
          <div class="attribute">性别:</div>
          <div class="value" v-if="!editStatus.editGender">
            {{
              user.gender === '0'
                ? '男'
                : user.gender === '1'
                ? '女'
                : '暂未选择'
            }}
          </div>
          <div class="value" v-else>
            <el-select v-model="user.gender" style="width: 100px">
              <el-option label="男" :value="'0'"></el-option>
              <el-option label="女" :value="'2'"></el-option>
            </el-select>
            <el-button
              class="check-button"
              @click="updateUserInfo('editGender')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <el-button
            class="edit-button"
            @click="editStatus.editGender = !editStatus.editGender"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <!-- 邮箱 -->
        <div class="user-info-item">
          <div class="attribute">邮箱:</div>
          <div class="value" v-if="!editStatus.editEmail">
            {{ user.email }}
          </div>
          <div class="value" v-else>
            <el-input
              @change="checkEmail"
              type="text"
              v-model="user.email"
              style="width: 200px"
            />
            <el-button
              class="check-button"
              @click="updateUserInfo('editEmail')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <span class="tip" ref="emailTip"></span>
          <el-button
            class="edit-button"
            @click="editStatus.editEmail = !editStatus.editEmail"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <!-- 手机号 -->
        <div class="user-info-item">
          <div class="attribute">手机号:</div>
          <div class="value" v-if="!editStatus.editPhone">
            <!-- 屏蔽中间四位为* -->
            {{ user.phone.substring(0, 3) + '****' + user.phone.substring(7) }}
          </div>
          <div class="value" v-else>
            <el-input
              @change="checkPhone"
              type="text"
              v-model="user.phone"
              style="width: 200px"
            />
            <el-button
              class="check-button"
              @click="updateUserInfo('editPhone')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <span class="tip" ref="phoneTip"></span>
          <el-button
            class="edit-button"
            @click="editStatus.editPhone = !editStatus.editPhone"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <!-- 密码 -->
        <div class="user-info-item">
          <div class="attribute">密码:</div>
          <div class="value" v-if="!editStatus.editPassword">******</div>
          <div class="value" v-else>
            <el-input
              @change="checkPassword"
              type="text"
              v-model="user.password"
              style="width: 200px"
            />
            <el-button
              class="check-button"
              @click="updateUserInfo('editPassword')"
              type="success"
              :icon="Check"
              plain
              circle
            />
          </div>
          <span class="tip" ref="passwordTip"></span>
          <el-button
            class="edit-button"
            @click="editStatus.editPassword = !editStatus.editPassword"
            type="primary"
            :icon="Edit"
            plain
            circle
          />
        </div>
        <div class="user-info-item">
          <div class="attribute">身份:</div>
          <div class="value">管理员</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 用户信息展示的容器样式 */
.user-page {
  padding-top: 100px;
  // 渐变色
  background: linear-gradient(to bottom, #737373, #1a1a1a);
  min-height: 1000px;
  width: 100%;
  .user-info-container {
    margin: 0 auto;
    background-color: rgb(0, 0, 0);
    border: 3px solid #ccc;
    // 背景图
    background-image: url('@/assets/logo/dbd-logo(1).png');
    // 不重复
    background-repeat: no-repeat;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    height: 700px;
    width: 500px;
    color: white;
    // text-align: center;
    /* 头像展示框的样式 */
    .avatar-uploader {
      position: relative;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 10px 10px 0 0;
      height: 200px;
      .avatar {
        width: 178px;
        height: 178px;
        margin: 0 auto;
        display: block;
        border: 1px solid #000;
        border-radius: 50%;
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
      .el-button {
        position: absolute;
        top: 180px;
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
    .btns {
      background-color: rgba(255, 255, 255, 0.8);
      text-align: center;
    }
    /* 姓名、年龄、性别等信息的样式 */
    .user-info {
      padding: 10px;
      // 透明白色
      background-color: rgba(255, 255, 255, 0.8);
      color: #616161;
      font-weight: 700;
      border-radius: 0 0 10px 10px;
      .user-info-item {
        position: relative;
        display: flex;
        height: 50px;
        line-height: 25px;
        align-items: flex-start;
        // justify-content: space-between;
        .attribute {
          // background-color: skyblue;
          color: #616161;
        }
        .value {
          display: flex;
          position: absolute;
          left: calc(30%);
          // background-color: rgb(255, 200, 0);
        }
        .tip {
          position: absolute;
          left: calc(30%);
          top: 28px;
          font-size: 14px;
          color: red;
        }
        .edit-button {
          position: absolute;
          right: 0;
        }
      }
    }

    /* 标题部分样式 */
    h2 {
      text-align: center;
      color: #fff;
      margin-bottom: 20px;
    }

    /* 角色身份展示的样式 */
    .role {
      display: inline-block;
      padding: 5px 10px;
      background-color: #4caf50; /* 默认绿色背景 */
      color: white;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      margin-top: 10px;
    }

    .role.admin {
      background-color: #f44336; /* 管理员身份的红色背景 */
    }

    .role.user {
      background-color: #2196f3; /* 普通用户身份的蓝色背景 */
    }
  }
}
</style>
