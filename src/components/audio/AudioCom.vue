<script setup>
import { ref, watch } from 'vue'
import audioData from '@/assets/audio/Michel F. April - Dead By Daylight (Theme).mp3'

const audio = ref(null) // 音频对象
const playFlag = ref(false) // 播放状态
// 播放
const play = () => {
  audio.value.play()
}

// 暂停
const stop = () => {
  audio.value.pause()
}

// 改变播放状态
const changeMuted = () => {
  playFlag.value = !playFlag.value
  console.log(playFlag.value)
}

watch(playFlag, (newValue) => {
  if (newValue) {
    play()
  } else {
    stop()
  }
})

defineExpose({
  play,
  stop,
  changeMuted
})
</script>

<template>
  <div class="audio-com">
    <audio ref="audio" :src="audioData"></audio>
    <div class="btns">
      <div class="change-btn" @click="changeMuted"><span>音乐</span></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.audio-com {
  .btns {
    .change-btn {
      position: fixed;
      left: 50px;
      bottom: 50px;
      width: 100px;
      height: 100px;
      // 渐变
      background: linear-gradient(-45deg, #000, #fff);
      // 阴影
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      border: 3px solid white;
      // text-align: center;
      line-height: 100px;
      font-size: 22px;
      color: yellow;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        color: rgb(86, 219, 86);
        background: linear-gradient(-45deg, #fff, #000);
      }
      span {
        // background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
