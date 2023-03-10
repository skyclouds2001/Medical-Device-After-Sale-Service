import Toast from '@vant/weapp/toast/toast'
import { login, auth } from '@/apis/admin'
import { getCompanyList } from '@/apis/company'
import { DEFAULT_PAGE_SIZE } from '@/config/index'
import { setStorage } from '@/lib/storage'
import { validatePhone, validatePassword } from '@/utils/validate'

const app = getApp<App>()

Page<{
  /**
   * 公司列表
   */
  companies: Company[]
  /**
   * 控制公司选择弹窗显示与否
   */
  show: boolean

  /**
   * 手机号
   */
  phone: string
  /**
   * 用户姓名
   */
  name: string
  /**
   * 用户所属公司
   */
  company: Company
}, {
  /**
   * 用户openid
   */
  openid: string

  /**
   * 加载公司列表方法
   */
  loadCompanyList: () => Promise<void>

  /**
   * 用户登录回调方法
   */
  userLogin: () => Promise<void>
  /**
   * 用户注册回调方法
   */
  userRegister: () => Promise<void>

  /**
   * 选择企业回调方法
   *
   * @param e 点击事件
   */
  handleManageSelector: (e: WechatMiniprogram.TouchEvent<{ value: Company }, { flag: boolean }>) => void
}>({

  data: {
    companies: [],
    show: false,

    name: '',
    phone: '',
    company: {
      company_id: -1,
      company_name: '',
    },
  },

  onLoad() {
    this.loadCompanyList()
    this.userLogin()
  },

  openid: '',

  async loadCompanyList() {
    try {
      let page = 1
      const res = await getCompanyList(page, true)
      if (res.code !== 0) throw res.data.toString()
      ++page

      const { total_num: num } = res.data
      this.setData({
        companies: [...res.data.company_list],
      })

      while (page <= num / DEFAULT_PAGE_SIZE + 1) {
        const res = await getCompanyList(page, false)
        if (res.code !== 0) throw res.data.toString()
        this.setData({
          companies: [...this.data.companies, ...res.data.company_list]
        })
        ++page
      }
    } catch {
      Toast.fail('加载企业列表失败')
    }
  },

  handleManageSelector(e) {
    if (e.type === 'confirm') {
      this.setData({
        company: e.detail.value,
        show: Boolean(e.mark?.flag),
      })
    } else {
      this.setData({
        show: Boolean(e.mark?.flag),
      })
    }
  },

  async userLogin() {
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
        }, 1000)
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/index',
          })
        }, 2000)
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
        this.openid = res.data.toString()
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('登录失败')
    }
  },

  async userRegister() {
    const { phone, name, company } = this.data

    if (company.company_id === -1 || company.company_name === '') {
      Toast.fail('需选择所属企业')
      return
    }
    if (!validatePhone(phone)) {
      Toast.fail('电话格式不正确')
      return
    }
    if (!validatePassword(name)) {
      Toast.fail('姓名格式不正确')
      return
    }

    try {
      const res = await auth(company?.company_id, name, phone, this.openid)
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
          Toast.fail('登录失败')
        }
      } else {
        Toast.fail('注册失败')
      }
    } catch {
      Toast.fail('注册失败')
    }
  },

})
