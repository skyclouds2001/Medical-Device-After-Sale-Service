import { SERVER_HOST } from '@/config/index'

export const request = <T>(params: WechatMiniprogram.RequestOption<Response<T>>) => {
  return new Promise<Response<T>>((resolve, reject) => {
    wx.request({
      ...params,
      url: SERVER_HOST + params.url,
      success: (result) => resolve(result.data as Response<T>),
      fail: (error) => reject(error)
    })
  })
}
