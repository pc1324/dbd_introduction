import request from '@/utils/request'
// 分页查询杀手
export const getKillerListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/killer', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 获取所有杀手
export const getAllKillerService = () => {
  return request.get('/killer/all')
}

// 根据id查询杀手
export const getKillerByIdService = (id) => {
  return request.get(`/killer/${id}`)
}

// 根据条件查询杀手
export const getKillerByConditionService = (params) => {
  return request.get('/killer/condition', {
    params
  })
}

// 新增杀手
// 注意：data需要是formData格式
export const addKillerService = (data) => {
  return request.post('/admin/killer/add', data)
}

// 修改杀手
export const updateKillerService = (data) => {
  return request.put('/admin/killer/update', data)
}

// 删除杀手
export const deleteKillerService = (ids) => {
  return request.delete(`/admin/killer/delete/${ids}`)
}

// 分页查询杀手技能
export const getKillerSkillListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/skill/killer', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 根据id查询杀手技能
export const getKillerSkillByIdService = (id) => {
  return request.get(`/skill/killer/${id}`)
}

// 新增杀手技能
export const addKillerSkillService = (data) => {
  return request.post('/admin/skill/killer/add', data)
}

// 修改杀手技能
export const updateKillerSkillService = (data) => {
  return request.put('/admin/skill/killer/update', data)
}

// 删除杀手技能
export const deleteKillerSkillService = (ids) => {
  return request.delete(`/admin/skill/killer/delete/${ids}`)
}
