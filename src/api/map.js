import request from '@/utils/request'

// 分页查询地图
export const getMapListService = (params) => {
  console.log('页码信息：' + params.page)
  console.log('每页展示：' + params.pageSize)
  return request.get('/map', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 根据地图id查询地图
export const getMapByIdService = (id) => {
  return request.get(`/map/${id}`)
}

// 查询所有地图系列
export const getAllMapSeriesService = () => {
  return request.get('/map/all/series')
}

// 添加地图
export const addMapService = (data) => {
  return request.post('/admin/map/add', data)
}

// 修改地图
export const updateMapService = (data) => {
  return request.put('/admin/map/update', data)
}

// 删除地图
export const deleteMapService = (ids) => {
  return request.delete(`/admin/map/delete/${ids}`)
}

// 校验地图名
export const checkMapByNameService = (name) => {
  return request.get(`/map/check/name/${name}`)
}
