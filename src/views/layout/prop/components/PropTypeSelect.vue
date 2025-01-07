<script setup>
import { ref } from 'vue'
import { getAllPropTypeService } from '@/api/prop'
// 数据
const propTypeList = ref([])
// 获取所有道具种类列表
const getAllPropType = async () => {
  const res = await getAllPropTypeService()
  // console.log('道具种类', res)
  propTypeList.value = res.data.data
  propTypeList.value.unshift({
    id: null,
    type: '全部'
  })
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
  <select
    :modelValue="modelValue"
    @change="emit('update:modelValue', $event.target.value)"
  >
    <!-- label是展示给用户看的，value是提交给后台的值 -->
    <option
      v-for="propType in propTypeList"
      :key="propType.id"
      :label="propType.type"
      :value="propType.id"
    ></option>
  </select>
</template>

<style lang="less" scoped>
select {
  width: 220px;
  height: 40px;
  font-size: 16px;
  /* 边框 */
  border: 3px solid #ccc;
  /* 透明色 */
  background-color: transparent;
  /* 去掉焦点框 */
  outline: 0;
  border-radius: 10px;
  transition: all 1s;
  color: #fff;
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
  option {
    color: black;
    &:checked {
      background-color: #e6e6e6;
      color: rgb(98, 197, 251);
      font-weight: 700;
    }
  }
}
</style>
