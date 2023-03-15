import { SERVER_HOST, WHITE_LIST } from '@/config/index'

const app = getApp<App>()

/**
 * 上传文件方法（原生wx.uploadFile方法包装）
 *
 * @param params 请求参数
 * @returns 请求执行Promise结果
 */
export const uploadFile = (params: WechatMiniprogram.UploadFileOption): Promise<WechatMiniprogram.UploadFileSuccessCallbackResult> => {
  const header = WHITE_LIST.includes(params.url) ? {} : {
    Authorization: 'Bearer ' + app.globalData.token,
  }
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...params,
      url: /https?/.test(params.url) ? params.url : SERVER_HOST + params.url,
      header: {
        ...params.header,
        ...header,
      },
      success: (result) => resolve(result),
      fail: (error) => reject(error),
    })
  })
}

/**
 * 下载文件方法（原生wx.downloadFile方法包装）
 *
 * @param params 请求参数
 * @returns 请求执行Promise结果
 */
export const downloadFile = (params: WechatMiniprogram.DownloadFileOption): Promise<WechatMiniprogram.DownloadFileSuccessCallbackResult> => {
  const header = WHITE_LIST.includes(params.url) ? {} : {
    Authorization: 'Bearer ' + app.globalData.token,
  }
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      ...params,
      url: /https?/.test(params.url) ? params.url : SERVER_HOST + params.url,
      header: {
        ...params.header,
        ...header,
      },
      success: (result) => resolve(result),
      fail: (error) => reject(error),
    })
  })
}
