import { SERVER_HOST, WHITE_LIST } from '@/config/index'

const app = getApp<App>()

/**
 * 上传文件方法（原生wx.uploadFile方法包装）
 *
 * @param params 请求参数
 * @returns 请求执行Promise结果
 */
export const uploadFile = (params: WechatMiniprogram.UploadFileOption): Promise<string> => {
  const header = WHITE_LIST.includes(params.url) ? {} : {
    Authorization: 'Bearer ' + app.globalData.token,
  }
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...params,
      url: SERVER_HOST + params.url,
      header: {
        ...params.header,
        ...header,
      },
      success: (result) => resolve(result.data),
      fail: (error) => reject(error),
    })
  })
}
