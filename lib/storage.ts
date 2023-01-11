interface Data<T = unknown> {
  value: T
  time: number
  expire: number
}

export const setStorageSync = <T = unknown>(key: string, value: T | null, expire = 0): void => {
  if (value === null || value === undefined) {
    value = null
  }
  if (Number.isNaN(expire) || expire < 0) {
    expire = 0
  }

  const data = JSON.stringify({
    value,
    time: Date.now(),
    expire,
  })

  wx.setStorageSync(key, data)
}

export const getStorageSync = <T = unknown>(key: string): T | null => {
  const value = wx.getStorageSync(key)

  if (value === '' || value === null || typeof value !== 'string') return null

  const data: Data<T> = JSON.parse(value)

  if (data.expire + data.time > Date.now()) {
    return data.value
  } else {
    removeStorageSync(key)
    return null
  }
}

export const removeStorageSync = (key: string): void => {
  wx.removeStorageSync(key)
}

export const clearStorageSync = (): void => {
  wx.clearStorageSync()
}

export const getStorageInfoSync = (): WechatMiniprogram.GetStorageInfoSyncOption => {
  return wx.getStorageInfoSync()
}
