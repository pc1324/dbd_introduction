<script setup>
import { ref } from 'vue'
import { getAllPropTypeService } from '@/api/prop'
// 数据
const propTypeList = ref([])
// 获取所有道具种类列表
const getAllPropType = async () => {
  const res = await getAllPropTypeService()
  console.log('道具种类', res)
  propTypeList.value = res.data.data
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

// created
getAllPropType()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <!-- label是展示给用户看的，value是提交给后台的值 -->
    <el-option
      v-for="propType in propTypeList"
      :key="propType.id"
      :label="propType.type"
      :value="propType.id"
    ></el-option>
  </el-select>
</template>

<style lang="less" scoped></style>
