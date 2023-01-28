/**
 * 请求响应对象
 */
interface Response<T = unknown> {
  /** 自定义的响应码 */
  code: number
  /** 笼统的提示信息 */
  msg: string
  /** 请求成功返回的数据 or 请求失败返回的可以呈现给用户的报错字符串 */
  data: T
}
