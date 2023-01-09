import { request } from '@/lib/index'

interface LoginResponse {
  customer_id: number
  token: string
}

export const login = (code: string) => {
  return request<LoginResponse>({
    url: `/wizz/aftersale/account/customer/login/${code}`,
    method: 'GET',
  })
}

export const auth = (id: number, name: string, phone: string, openid: string) => {
  return request<undefined>({
    url: '/wizz/aftersale/account/customer/authenticate',
    method: 'GET',
    data: {
      company_id: id,
      customer_name: name,
      mobile: phone,
      open_id: openid,
    },
  })
}
