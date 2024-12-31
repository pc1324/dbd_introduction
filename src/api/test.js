import request from '@/utils/request'

// 测试用接口
export const testService = (data) => {
  return request.get(`/test/${data}`)
}
