/**
 * 校验手机号方法
 *
 * @param phone 待校验手机号
 * @returns 校验手机号结果
 */
export const validatePhone = (phone: string) => {
  return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(phone)
}
