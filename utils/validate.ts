/**
 * 校验手机号方法
 *
 * @param phone 待校验手机号
 * @returns 校验手机号结果
 */
export const validatePhone = (phone: string) => {
  return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone) || /^0?\d{2,3}-?\d{7,8}$/.test(phone)
}
