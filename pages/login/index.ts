import Toast from '@vant/weapp/toast/toast'
import { login, auth } from '@/apis/admin'
import { setStorage } from '@/lib/storage'
import { validatePhone, validatePassword } from '@/utils/validate'

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
}, {
  /**
   * 用户openid
   */
  openid: string

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
  },

  onLoad() {
    this.autoLogin()
  },

  openid: '',

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
        // todo
        Toast.clear()
        this.openid = res.data.toString()
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('登录失败')
    }
  },

  async userLogin() {
    const { pwd: phone, name } = this.data

    if (!validatePhone(phone)) {
      Toast.fail('电话格式不正确')
      return
    }
    if (!validatePassword(name)) {
      Toast.fail('姓名格式不正确')
      return
    }

    try {
      const res = await auth(34, name, phone, this.openid)
      if (res.code === 0) {
        Toast.success('注册成功')

        const { code } = await wx.login()
        const res = await login(code)

        if (res.code === 0) {
          const { token, customer_id, company_name, email: phone } = res.data
          wx.switchTab({
            url: '/pages/index/index',
          })

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
        Toast.fail('注册失败')
      }
    } catch {
      Toast.fail('注册失败')
    }
  },

})
