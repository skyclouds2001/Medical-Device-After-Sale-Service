/**
 * 转换时间至指定格式方法
 *
 * @param date 待转换时间
 * @returns 转换后指定格式的日期（字符串）
 */
export const transformDate = (date: Date): string => {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
