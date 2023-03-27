import { request } from '@/lib/request'

interface LoginResponse {
  customer_id: number
  company_name: string
  email: string
  token: string
}

/**
 * 用户登录方法
 *
 * @param name 客户邮箱
 * @param pwd 密码
 */
export const login = (name: string, pwd: string) => {
  return request<LoginResponse>({
    url: '/wizz/aftersale/account/customer/login',
    method: 'GET',
    data: {
      username: name,
      password: pwd,
    },
  })
}
