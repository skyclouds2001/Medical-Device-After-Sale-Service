import { request } from '@/lib/request'

interface LoginResponse {
  customer_id: number
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
 * @param name 客户姓名
 * @param phone 客户手机号
 * @param openid 客户openid
 */
export const auth = (id: number, name: string, phone: string, openid: string) => {
  return request<AuthResponse>({
    url: '/wizz/aftersale/account/customer/authenticate',
    method: 'POST',
    data: {
      company_id: id,
      customer_name: name,
      mobile: phone,
      open_id: openid,
    },
    header: {
      'content-type': 'application/json',
    },
  })
}
