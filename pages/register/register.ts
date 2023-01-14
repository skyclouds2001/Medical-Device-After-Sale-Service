import Toast from '@vant/weapp/toast/toast'
import { login, auth } from '@/apis/admin'
import { getCompanyList } from '@/apis/company'
import { DEFAULT_PAGE_SIZE } from '@/config/index'
import { validatePhone, validatePassword } from '@/utils/validate'

Page<{
  companies: any[]
  show: boolean

  phone: string
  name: string
  company: Company | ''
}, {
  openid: string

  loadCompanyList: () => Promise<void>

  userLogin: () => Promise<void>
  userRegister: () => Promise<void>

  handleManageSelector: (e: WechatMiniprogram.TouchEvent<{ value: Company }, { flag: boolean }>) => void
}>({

  data: {
    companies: ['666', '777'],
    show: false,

    name: '',
    phone: '',
    company: '',
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
      const { code } = await wx.login()
      const res = await login(code)
      if (res.code === 0) {
        const { token, customer_id } = res.data
        wx.switchTab({
          url: '/pages/index/index',
        })
        getApp<App>().globalData.token = token
        getApp<App>().globalData.id = customer_id
        wx.setStorageSync<string>('token', token)
        wx.setStorageSync<number>('id', customer_id)
      } else if (res.code === 1070) {
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

    if (company === '') {
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
          const { token, customer_id } = res.data
          wx.switchTab({
            url: '/pages/index/index',
          })
          getApp<App>().globalData.token = token
          getApp<App>().globalData.id = customer_id
          wx.setStorageSync<string>('token', token)
          wx.setStorageSync<number>('id', customer_id)
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
