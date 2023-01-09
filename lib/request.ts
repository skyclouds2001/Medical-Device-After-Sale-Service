import { SERVER_HOST } from '@/config'

export const request = <T>(params: WechatMiniprogram.RequestOption<Response<T>>) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: SERVER_HOST + params.url,
      success: (result) => resolve(result.data),
      fail: (error) => reject(error)
    })
  })
}
