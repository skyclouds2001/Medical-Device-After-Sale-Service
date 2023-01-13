App<App>({

  globalData: {
    token: '',
  },

  onLaunch () {
    this.globalData.token = wx.getStorageSync('token')
  },

})
