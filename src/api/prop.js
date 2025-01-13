import request from '@/utils/request'

// 分页查询道具
export const getPropListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/prop', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 根据id查询道具
export const getPropByIdService = (id) => {
  return request.get(`/prop/${id}`)
}

// 根据id查询道具类型
export const getPropTypeByIdService = (id) => {
  return request.get(`/prop/type/${id}`)
}

// 获取所有道具类型
export const getAllPropTypeService = () => {
  return request.get('/prop/type/all')
}

// 添加道具
// 注意：data需要是formData格式
export const addPropService = (data) => {
  return request.post('/admin/prop/add', data)
}

// 更新道具
export const updatePropService = (data) => {
  return request.put('/admin/prop/update', data)
}

// 删除道具
export const deletePropService = (ids) => {
  return request.delete(`/admin/prop/delete/${ids}`)
}

// 添加道具类型
export const addPropTypeService = (data) => {
  return request.post('/admin/prop/type/add', data)
}

// 修改道具类型
export const updatePropTypeService = (data) => {
  return request.put('/admin/prop/type/update', data)
}

// 删除道具类型
export const deletePropTypeService = (ids) => {
  return request.delete(`/admin/prop/type/delete/${ids}`)
}

// 根据道具名校验
export const checkPropByNameService = (name) => {
  return request.get(`/prop/check/name/${name}`)
}
