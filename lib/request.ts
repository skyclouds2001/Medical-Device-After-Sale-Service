import { SERVER_HOST, WHITE_LIST } from '@/config/index'

export const request = <T>(params: WechatMiniprogram.RequestOption<Response<T>>) => {
  const header = WHITE_LIST.includes(params.url) ? [] : [
    {
      Authorization: wx.getStorageSync('token'),
    },
  ]
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
