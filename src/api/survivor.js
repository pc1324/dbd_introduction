import request from '@/utils/request'
// 分页查询逃生者
export const getSurvivorListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/survivor', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 获取所有逃生者
export const getAllSurvivorService = () => {
  return request.get('/survivor/all')
}

// 根据id查询逃生者
export const getSurvivorByIdService = (id) => {
  return request.get(`/survivor/${id}`)
}

// 根据名称查询逃生者
export const getSurvivorByNameService = (name) => {
  return request.get('/survivor/name', {
    params: {
      name
    }
  })
}

// 新增逃生者
// 注意：data需要是formData格式
export const addSurvivorService = (data) => {
  return request.post('/admin/survivor/add', data)
}

// 修改逃生者
export const updateSurvivorService = (data) => {
  return request.put('/admin/survivor/update', data)
}

// 删除逃生者
export const deleteSurvivorService = (ids) => {
  return request.delete(`/admin/survivor/delete/${ids}`)
}

// 分页查询逃生者技能
export const getSurvivorSkillListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/skill/survivor', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 根据id查询逃生者技能
export const getSkillByIdService = (id) => {
  return request.get(`/skill/survivor/${id}`)
}

// 新增逃生者技能
export const addSkillService = (data) => {
  return request.post('/admin/skill/survivor/add', data)
}

// 修改逃生者技能
export const updateSkillService = (data) => {
  return request.put('/admin/skill/survivor/update', data)
}

// 删除逃生者技能
export const deleteSkillService = (ids) => {
  return request.delete(`/admin/skill/survivor/delete/${ids}`)
}
