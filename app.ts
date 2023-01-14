App<App>({

  globalData: {
    token: '',
    id: 0,
    userinfo: {
      nickname: '',
      avatar: '',
    },
  },

  onLaunch () {
    this.globalData.token = wx.getStorageSync<string>('token')
    this.globalData.id = wx.getStorageSync<number>('id')
    const userinfo = wx.getStorageSync<UserInfo>('userinfo')
    this.globalData.userinfo.nickname = userinfo.nickname ?? '点击登录'
    this.globalData.userinfo.avatar = userinfo.avatar ?? '/icons/user.svg'
  },

})
