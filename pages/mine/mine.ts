import Toast from '@vant/weapp/toast/toast'

const app = getApp<App>()

Page<{
  nickname: string
  avatar: string
  show: boolean
}, {
  showLoginDialog: () => void
  confirmLogin: (e: WechatMiniprogram.CustomEvent<{
    avatar: string
    nickname: string
  }>) => void
  editBindPhone: () => void
  exitLogin: () => void
}>({

  data: {
    nickname: '点击登录',
    avatar: '/icons/user.svg',
    show: false,
  },

  onLoad () {
    const { userinfo } = app.globalData
    this.setData({
      nickname: userinfo. nickname,
      avatar: userinfo.avatar,
    })
  },

  onShow () {
    this.getTabBar().setData({
      active: 1,
    })
  },

  showLoginDialog () {
    const { nickname, avatar } = this.data
    if (nickname === '点击登录' || avatar === '/icons/user.svg') {
      this.setData({
        show: true,
      })
    }
  },

  confirmLogin (e) {
    const { nickname, avatar } = e.detail
    if (nickname === '') {
      Toast.fail('昵称不能为空')
      return
    }
    if (avatar === '') {
      Toast.fail('头像不能为空')
      return
    }
    this.setData({
      nickname,
      avatar,
    })
    wx.setStorageSync<UserInfo>('userinfo', {
      nickname,
      avatar,
    })
  },

  editBindPhone () {},

  exitLogin () {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userinfo')
    app.globalData.token = ''
    app.globalData.userinfo.nickname = '点击登录'
    app.globalData.userinfo.avatar = '/icons/user.svg'
    wx.reLaunch({
      url: '/pages/register/register',
    })
  },

})
