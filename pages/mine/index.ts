import Toast from '@vant/weapp/toast/toast'
import { DEFAULT_NICKNAME, DEFAULT_AVATAR } from '@/config/index'
import { uploadFile } from '@/lib/file'
import type App from '@/models/App'
import type Response from '@/models/Response'

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
    company: '未知企业',
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

  async handleChooseAvatar (e) {
    const avatar = e.detail.avatarUrl
    this.setData({
      avatar,
    })

    app.globalData.userinfo.avatar = avatar

    const userinfo = wx.getStorageSync('userinfo')
    wx.setStorageSync('userinfo', { ...userinfo, avatar })

    try {
      const res = await uploadFile({
        url: '/wizz/aftersale/media/upload',
        filePath: avatar,
        name: 'file',
      })

      const result: Response<string> = JSON.parse(res.data)

      if (result.code === 0) {
        const avatar = result.data
        this.setData({
          avatar,
        })
        app.globalData.userinfo.avatar = avatar
        const userinfo = wx.getStorageSync('userinfo')
        wx.setStorageSync('userinfo', { ...userinfo, avatar })
      } else {
        Toast.fail(result.data?.toString() ?? '上传图片失败')
      }
    } catch {
      Toast.fail('上传图片失败')
    }
  },

  editPassword () {
    wx.navigateTo({
      url: '/pages/reset-password/index',
    })
  },

  exitLogin () {
    wx.removeStorageSync('token')
    wx.removeStorageSync('expire')
    app.globalData.token = ''

    this.setData({
      avatar: DEFAULT_AVATAR,
      nickname: DEFAULT_NICKNAME,
      company: '未知企业',
    })
    wx.removeStorageSync('userinfo')
    app.globalData.userinfo.nickname = DEFAULT_NICKNAME
    app.globalData.userinfo.avatar = DEFAULT_AVATAR

    wx.exitMiniProgram()
  },

})
