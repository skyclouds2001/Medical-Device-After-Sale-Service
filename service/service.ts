import { HOST } from '../config/config'

export const request = (params: WechatMiniprogram.RequestOption): Promise<WechatMiniprogram.RequestSuccessCallbackResult> => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: HOST + params.url,
      success: result => resolve(result),
      fail: error => reject(error)
    })
  })
}
