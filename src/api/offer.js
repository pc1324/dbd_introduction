import request from '@/utils/request'

// 分页查询祭品
export const getOfferListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/offer', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 根据id查询祭品
export const getOfferByIdService = (id) => {
  return request.get(`/offer/${id}`)
}

// 添加祭品
export const addOfferService = (data) => {
  return request.post('/admin/offer/add', data)
}

// 修改祭品
export const updateOfferService = (data) => {
  return request.put('/admin/offer/update', data)
}

// 删除祭品
export const deleteOfferService = (ids) => {
  return request.delete(`/admin/offer/delete/${ids}`)
}
