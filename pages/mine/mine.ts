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
  editBindPhone: () => void
  /**
   * 退出登录方法
   */
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

  editBindPhone () {
    Toast.fail('小程序端暂不支持修改手机，请联系客服人员')
  },

  exitLogin () {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userinfo')
    app.globalData.token = ''
    app.globalData.userinfo.nickname = DEFAULT_NICKNAME
    app.globalData.userinfo.avatar = DEFAULT_AVATAR
  },

})
