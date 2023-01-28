/**
 * App对象数据模型
 */
interface App {
  /** 全局数据对象 */
  globalData: {
    /** 客户token */
    token: string
    /** 客户ID */
    id: number
    /** 客户信息 */
    userinfo: UserInfo
  }
}
