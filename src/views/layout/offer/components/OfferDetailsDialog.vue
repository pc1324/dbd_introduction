<script setup>
import { ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/avatar.jpg'

const dialogVisible = ref(false) // 弹窗显示控制
const data = ref({}) // 表单数据
const dialog = ref()

// 打开弹窗
const open = (row) => {
  dialogVisible.value = true
  // 赋值
  data.value = { ...row } // 添加 => 重置表单内容了，编辑 => 回显了需要回显的数据
  console.log(data.value)
  // 透明度
  dialog.value.style.opacity = 1
  // 层级
  dialog.value.style.zIndex = 999
  // 高度
  dialog.value.children[0].style.top = '40%'
}

const close = () => {
  dialogVisible.value = false
  // 透明度
  dialog.value.style.opacity = 0
  // 层级
  dialog.value.style.zIndex = -10
  // 高度
  dialog.value.children[0].style.top = '30%'
}

defineExpose({
  open
})
</script>

<template>
  <div ref="dialog" class="details-shadow">
    <div class="details-dialog" style="width: 40%">
      <div class="dialog-header">
        <slot name="header">
          <el-icon @click="close"><CloseBold /></el-icon>
        </slot>
      </div>
      <div class="dialog-body">
        <slot name="body">
          <div class="avatar">
            <div class="image">
              <img :src="data.imgurl || defaultAvatar" alt="" />
            </div>
            <span>{{ data.name }}</span>
          </div>
          <div class="introduction">
            <span>种类：</span>
            <span>{{
              data.offerType === '0'
                ? '通用'
                : data.offerType === '1'
                ? '逃生者祭品'
                : data.offerType === '2'
                ? '杀手祭品'
                : '未知'
            }}</span>
            <br />

            <span>品质：</span>
            <span
              v-if="data.quality === '普通'"
              style="color: #000000; font-weight: 700"
              >普通</span
            >
            <span
              v-else-if="data.quality === '精良'"
              style="color: #ffde59; font-weight: 700"
              >精良</span
            >
            <span
              v-else-if="data.quality === '稀有'"
              style="color: #09c502; font-weight: 700"
              >稀有</span
            >
            <span
              v-else-if="data.quality === '非常稀有'"
              style="color: #cc6ce7; font-weight: 700"
              >非常稀有</span
            >
            <span
              v-else-if="data.quality === '超级稀有'"
              style="color: #e4080a; font-weight: 700"
              >超级稀有</span
            >
            <span
              v-else-if="data.quality === '活动'"
              style="color: #fe9900; font-weight: 700"
              >活动</span
            >
            <div class="content">
              <span
                >道具介绍：
                <div v-html="data.description"></div
              ></span>
            </div>
          </div>
        </slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <el-button type="success" @click="close"> 关闭 </el-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.details-shadow {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // height: 300px;
  // 透明背景
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -10;
  transition: all 0.5s;
  opacity: 0;
  .details-dialog {
    position: absolute;
    // 居中
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    padding: 5px;
    // min-height: 100px;
    // 渐变色
    background: linear-gradient(to bottom, #a8a8a8, #2e2e2e);
    border-radius: 10px;
    border: 5px solid #bdbdbd8b;
    color: #ffffff;
    transition: all 0.5s;
    .dialog-header {
      display: flex;
      justify-content: flex-end;
      // background-color: pink;
      .el-icon {
        font-size: 40px;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
      }
    }
    .dialog-body {
      padding-top: 10px;
      .avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        // height: 100%;
        // background-color: skyblue;
        .image {
          width: 150px;
          img {
            width: 100%;
            border: 3px solid #e5e5e5;

            border-radius: 50%;
          }
        }
        span {
          font-size: 28px;
          font-weight: 700;
        }
      }
      .introduction {
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.902);
        color: #000;
        border-radius: 10px;
        .ownerName {
          a {
            color: #25c2e6;
            cursor: pointer;
            &:hover {
              color: orange;
            }
          }
        }
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      // background-color: pink;
    }
  }
}
</style>
