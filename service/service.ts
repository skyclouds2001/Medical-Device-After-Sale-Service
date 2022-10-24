import { HOST } from '../config/config'

export const request = <T>(params: WechatMiniprogram.RequestOption): Promise<WechatMiniprogram.RequestSuccessCallbackResult<T>> => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: HOST + params.url,
      success: (result: WechatMiniprogram.RequestSuccessCallbackResult<T>) => resolve(result),
      fail: (error: WechatMiniprogram.Err) => reject(error)
    })
  })
}
