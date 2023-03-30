import Toast from '@vant/weapp/toast/toast'
import { login } from '@/apis/admin'

const app = getApp<App>()

Page<{
  /**
   * 手机号
   */
  pwd: string
  /**
   * 用户姓名
   */
  name: string
  /**
   * 控制是否展示忘记密码提示
   */
  forget: boolean
  /**
   * 密码输入框是否使用密码
   */
  pwdVisiable: boolean
}, {
  /**
   * 用户openid
   */
  openid: string
  /**
   * 切换忘记密码提示框方法
   */
  toggleForgetPasswordRecommend: () => void
  /**
   * 切换密码输入框可见性方法
   */
  handleTogglePasswordFieldVisibility: () => void

  /**
   * 用户自动登录方法
   */
  autoLogin: () => Promise<void>
  /**
   * 用户手动登录方法
   */
  userLogin: () => Promise<void>
}>({

  data: {
    name: '',
    pwd: '',
    forget: false,
    pwdVisiable: false,
  },

  onLoad() {
    this.autoLogin()
  },

  openid: '',

  toggleForgetPasswordRecommend () {
    const { forget } = this.data
    this.setData({
      forget: !forget,
    })
  },

  handleTogglePasswordFieldVisibility () {
    const { pwdVisiable } = this.data
    this.setData({
      pwdVisiable: !pwdVisiable,
    })
  },

  async autoLogin() {
    const token = wx.getStorageSync('token')
    const expire = wx.getStorageSync('expire')
    const current = new Date().getTime()

    if (token === '' || expire === '' || expire - current > 1000 * 60 * 60 * 24 * 3) {
      wx.removeStorageSync('token')
      wx.removeStorageSync('expire')
    } else {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/home/index',
        })
      }, 0)
    }
  },

  async userLogin() {
    const { pwd, name } = this.data

    if (!name) {
      Toast.fail('用户名不能为空')
      return
    }
    if (!pwd) {
      Toast.fail('密码不能为空')
      return
    }

    try {
      const res = await login(name, pwd)
      if (res.code === 0) {
        Toast.success('登录成功')

        const { token, customer_id, company_name, email: phone } = res.data

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/index',
          })
        }, 0)

        app.globalData.token = token
        app.globalData.id = customer_id
        app.globalData.company = company_name
        app.globalData.phone = phone

        wx.setStorageSync('token', token)
        wx.setStorageSync('expire', new Date().getTime())
        wx.setStorageSync('id', customer_id)
        wx.setStorageSync('company', company_name)
        wx.setStorageSync('phone', phone)
      } else {
        Toast.fail(res.data?.toString() ?? '登录失败')
      }
    } catch {
      Toast.fail('登录失败')
    }
  },

})
