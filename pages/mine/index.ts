import Toast from '@vant/weapp/toast/toast'
import { DEFAULT_NICKNAME, DEFAULT_AVATAR } from '@/config/index'

const app = getApp<App>()

Page<{
  /**
   * 用户昵称
   */
  nickname: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户所属公司
   */
  company: string
}, {
  /**
   * 选取头像方法
   */
  handleChooseAvatar: (e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) => void
  /**
   * 跳转至修改密码页方法
   */
  editPassword: () => void
  /**
   * 退出登录方法
   */
  exitLogin: () => void
}>({

  data: {
    nickname: DEFAULT_NICKNAME,
    avatar: DEFAULT_AVATAR,
    company: '企业名称',
  },

  onLoad () {
    const { userinfo, company, phone } = app.globalData
    this.setData({
      nickname: phone,
      avatar: userinfo.avatar,
      company,
    })
  },

  onShow () {
    this.getTabBar().setData({
      active: 1,
    })
  },

  handleChooseAvatar (e) {
    const avatar = e.detail.avatarUrl
    this.setData({
      avatar,
    })

    app.globalData.userinfo.avatar = avatar

    const userinfo = wx.getStorageSync('userinfo')
    wx.setStorageSync('userinfo', { ...userinfo, avatar })
  },

  editPassword () {
    wx.navigateTo({
      url: '/pages/reset-password/index',
    })
  },

  exitLogin () {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userinfo')
    app.globalData.token = ''
    app.globalData.userinfo.nickname = DEFAULT_NICKNAME
    app.globalData.userinfo.avatar = DEFAULT_AVATAR
  },

})
