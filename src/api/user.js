import request from '@/utils/request'
// 发送普通登录请求
export const loginService = (data) => {
  return request.post('/login', data)
}

// 发送管理员登录请求
export const adminLoginService = (data) => {
  return request.post('/login/admin', data)
}

// 注册用户
export const registerService = (data) => {
  return request.post('/register', data)
}

// 获取当前用户信息（请求头token）
export const getUserInfoService = () => {
  return request.get('/user/info')
}

// 获取用户信息（id）
export const getUserByIdService = (id) => {
  return request.get(`/user/info/${id}`)
}

// 管理员获取用户列表
export const getUserListService = (params) => {
  return request.get('/admin/user', {
    params
    // pagenum 当前页码数 pagesize 当前页需要的数据条数
    // 其他参数根据条件封装进params
  })
}

// 管理员新增用户
// 注意：data需要是formData格式
export const addUserService = (data) => {
  return request.post('/admin/user/add', data)
}

// 管理员删除用户
export const deleteUserService = (ids) => {
  return request.delete(`/admin/user/delete/${ids}`)
}

// 管理员修改用户
export const updateUserService = (data) => {
  return request.put('/admin/user/update', data)
}

// 普通用户修改信息
export const updateUserInfoService = (data) => {
  return request.put('/user/update', data)
}

// 校验用户名是否重复
export const checkUserNameService = (username) => {
  return request.get(`/register/check/username/${username}`)
}

// 校验邮箱是否重复
export const checkEmailService = (email) => {
  return request.get(`/register/check/email/${email}`)
}

// 检验登录是否过期
export const checkLoginService = () => {
  return request.get('/user/check')
}
