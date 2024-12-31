<script setup>
import { ref } from 'vue'
import { getAllMapSeriesService } from '@/api/map'
// 数据
const mapSeriesList = ref([])
// 获取所有地图系列列表
const getAllMapSeries = async () => {
  const res = await getAllMapSeriesService()
  console.log('地图系列', res)
  mapSeriesList.value = res.data.data
}
// 传递数据列表
const props = defineProps({
  modelValue: {
    // 支持 Number、String 类型数据
    type: [Number, String]
  },
  width: {
    // 选择器宽度
    type: String,
    default: '240px'
  }
})

console.log(props)

const emit = defineEmits(['update:modelValue'])

// 暴露方法
defineExpose({
  getAllMapSeries
})
// created
getAllMapSeries()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <!-- label是展示给用户看的，value是提交给后台的值 -->
    <el-option
      v-for="series in mapSeriesList"
      :key="series"
      :label="series"
      :value="series"
    ></el-option>
  </el-select>
</template>

<style lang="less" scoped></style>
