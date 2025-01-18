<script setup>
import WaterBorder from '@/views/layout/survivor/components/WaterBorder.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jumpDetails = (item) => {
  console.log('jumpDetails')
  router.push({
    path: '/survivor/details',
    query: {
      id: item.id
    }
  })
}
// created
</script>

<template>
  <WaterBorder :jumpDetails="jumpDetails"></WaterBorder>
  <!-- <div
    @click="jumpDetails(item)"
    @mouseenter="showCover"
    @mouseleave="notShowCover"
    class="list-item"
    v-for="(item, index) in dataList"
    :key="index"
  >
    <img :src="item.image || defaultAvatar" alt="" />
    <div class="cover">
      <h3>{{ item.name }}</h3>
      <p v-if="item.story.length > 100">{{ item.story.slice(0, 100) }}...</p>
      <p v-else>
        {{ item.story }}
      </p>
    </div>
    <span class="top-left"></span>
    <span class="bottom-right"></span>
  </div> -->
</template>

<style lang="less" scoped></style>
