/**
 * 批量获取存储方法（兼容wx.batchGetStorageSync原生包装方法）
 *
 * @param params 存储键名组
 * @returns 批量获取的存储键值对组
 */
export const getStorage = (...params: string[]): any[] => {
  if (wx.canIUse('batchGetStorageSync')) {
    return wx.batchGetStorageSync([...params])
  } else {
    return new Array(params.length)
      .fill('')
      .map((_, i) => wx.getStorageSync(params[i]))
  }
}

/**
 * 批量执行存储方法（兼容wx.batchGetStorageSync原生包装方法）
 *
 * @param params 存储键值对组
 */
export const setStorage = (...params: Array<{ key: string, value: any }>): void => {
  if (wx.canIUse('batchSetStorageSync')) {
    wx.batchSetStorageSync([...params])
  } else {
    new Array(params.length)
      .fill('')
      .forEach((_, i) => {
        const data = params[i]
        wx.setStorageSync(data.key, data.value)
      })
  }
}
