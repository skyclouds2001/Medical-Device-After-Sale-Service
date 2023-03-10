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
  /**
   * 显示用户登录弹窗
   */
  show: boolean
}, {
  /**
   * 显示登录弹窗方法
   */
  showLoginDialog: () => void
  /**
   * 确认登录回调方法
   *
   * @param e 确认登录方法
   */
  confirmLogin: (e: WechatMiniprogram.CustomEvent<{
    avatar: string
    nickname: string
  }>) => void
  /**
   * 取消登录回调方法
   */
  cancelLogin: () => void
  /**
   * 修改绑定手机号方法
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
    show: false,
  },

  onLoad () {
    const { userinfo, company } = app.globalData
    this.setData({
      nickname: userinfo.nickname,
      avatar: userinfo.avatar,
      company,
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
      show: false,
    })
    wx.setStorageSync<UserInfo>('userinfo', {
      nickname,
      avatar,
    })
  },

  cancelLogin () {
    this.setData({
      show: false,
    })
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
