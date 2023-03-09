import { request } from '@/lib/request'

/**
 * 重设用户密码方法
 *
 * @param oldPwd 旧密码
 * @param newPwd 新密码
 */
export const resetUserPassword = (oldPwd: string, newPwd: string) => {
  return request<any>({
    url: '/wizz/aftersale/account/customer/resetMyPassword',
    method: 'GET',
    data: {
      oldPassword: oldPwd,
      newPassword: newPwd,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}
