import { SERVER_HOST, WHITE_LIST } from '@/config/index'

const app = getApp<App>()

/**
 * 请求方法（原生wx.request方法包装）
 *
 * @param params 请求参数
 * @returns 请求执行Promise结果
 */
export const request = <T>(params: WechatMiniprogram.RequestOption<Response<T>>) => {
  const header = WHITE_LIST.includes(params.url) ? {} : {
    Authorization: 'Bearer ' + app.globalData.token,
  }
  return new Promise<Response<T>>((resolve, reject) => {
    wx.request<Response<T>>({
      ...params,
      url: SERVER_HOST + params.url,
      header: {
        ...params.header,
        ...header,
      },
      success: (result) => resolve(result.data),
      fail: (error) => reject(error)
    })
  })
}
