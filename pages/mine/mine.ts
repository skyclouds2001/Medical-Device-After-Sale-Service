import Toast from '@vant/weapp/toast/toast'
import { DEFAULT_NICKNAME, DEFAULT_AVATAR } from '@/config/index'

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
    nickname: DEFAULT_NICKNAME,
    avatar: DEFAULT_AVATAR,
    show: false,
  },

  onLoad () {
    const { userinfo } = app.globalData
    this.setData({
      nickname: userinfo.nickname,
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
    if (nickname === DEFAULT_NICKNAME || avatar === DEFAULT_AVATAR) {
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
    app.globalData.userinfo.nickname = DEFAULT_NICKNAME
    app.globalData.userinfo.avatar = DEFAULT_AVATAR
    wx.reLaunch({
      url: '/pages/register/register',
    })
  },

})
