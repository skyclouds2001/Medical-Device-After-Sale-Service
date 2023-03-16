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
 * @param code 登录令牌
 */
export const login = (code: string) => {
  return request<LoginResponse>({
    url: '/wizz/aftersale/account/customer/login',
    method: 'POST',
    data: { code },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}

type AuthResponse = {}

/**
 * 用户注册方法
 *
 * @param id 企业ID
 * @param name 客户邮箱
 * @param pwd 密码
 * @param openid 客户openid
 */
export const auth = (id: number, name: string, pwd: string, openid: string) => {
  return request<AuthResponse>({
    url: '/wizz/aftersale/account/customer/authenticate',
    method: 'POST',
    data: {
      company_id: id,
      customer_name: name,
      customer_password: pwd,
      open_id: openid,
    },
    header: {
      'content-type': 'application/json',
    },
  })
}
