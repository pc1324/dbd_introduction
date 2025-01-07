<script setup>
import { ref } from 'vue'
import { getAllSurvivorService } from '@/api/survivor'
import { getAllKillerService } from '@/api/killer'
// 数据
const survivorList = ref([])
const killerList = ref([])
// 获取所有逃生者列表
const getAllSurvivor = async () => {
  const res = await getAllSurvivorService()
  // console.log(res)
  survivorList.value = res.data.data
  survivorList.value.unshift({
    id: 0,
    name: '通用技能'
  })
  survivorList.value.unshift({
    id: null,
    name: '无'
  })
  // console.log(survivorList.value)
}
// 获取所有杀手列表
const getAllKiller = async () => {
  const res = await getAllKillerService()
  // console.log(res)
  killerList.value = res.data.data
  killerList.value.unshift({
    id: 0,
    name: '通用技能'
  })
  killerList.value.unshift({
    id: null,
    name: '无'
  })
  // console.log(killerList.value)
}

// 传递数据列表
const props = defineProps({
  modelValue: {
    // 支持 Number、String 类型数据
    type: [Number, String]
  },
  ownerList: String, // 传入的标识（survivor/killer）
  width: {
    // 选择器宽度
    type: String,
    default: '240px'
  }
})

console.log(props)

const emit = defineEmits(['update:modelValue'])

// created
getAllSurvivor()
getAllKiller()
</script>

<template>
  <select
    :modelValue="modelValue"
    @change="emit('update:modelValue', $event.target.value)"
    :style="{ width }"
    size="large"
  >
    <!-- label是展示给用户看的，value是提交给后台的值 -->
    <option
      v-for="owner in ownerList === 'survivor' ? survivorList : killerList"
      :key="owner.id"
      :label="owner.identity || owner.name"
      :value="owner.id"
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
