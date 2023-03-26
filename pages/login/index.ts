import Toast from '@vant/weapp/toast/toast'
import { login, auth } from '@/apis/admin'
import { setStorage } from '@/lib/storage'

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
    try {
      Toast.loading({
        message: '登录中',
        duration: 0,
        mask: true,
      })

      const { code } = await wx.login()
      const res = await login(code)

      if (res.code === 0) {
        const { token, customer_id, company_name, email: phone } = res.data

        setTimeout(() => {
          Toast.clear()
          Toast.success('登录成功')
        }, 500)

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/index',
          })
        }, 2500)

        app.globalData.token = token
        app.globalData.id = customer_id
        app.globalData.company = company_name
        app.globalData.phone = phone

        setStorage(
          {
            key: 'token',
            value: token,
          },
          {
            key: 'id',
            value: customer_id,
          },
          {
            key: 'company',
            value: company_name,
          },
          {
            key: 'phone',
            value: phone,
          },
        )
      } else if (res.code === 1070) {
        Toast.clear()
        Toast('请输入用户名密码登录')
        this.openid = res.data.toString()
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('登录失败')
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
      const res = await auth(34, name, pwd, this.openid)
      if (res.code === 0) {
        Toast.success('注册成功')

        const { code } = await wx.login()
        const res = await login(code)

        if (res.code === 0) {
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

          setStorage(
            {
              key: 'token',
              value: token,
            },
            {
              key: 'id',
              value: customer_id,
            },
            {
              key: 'company',
              value: company_name,
            },
            {
              key: 'phone',
              value: phone,
            },
          )
        } else {
          Toast.fail(res.data?.toString() ?? '登录失败')
        }
      } else {
        Toast.fail(res.data?.toString() ?? '注册失败')
      }
    } catch {
      Toast.fail('注册失败')
    }
  },

})
