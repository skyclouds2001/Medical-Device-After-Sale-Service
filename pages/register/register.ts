import { login, auth } from '@/apis/admin'
import Toast from '@vant/weapp/toast/toast'

Page<{
  companies: any[],
  show: boolean,

  phone: string,
  password: string,
  company: string,
}, {
  userLogin: () => Promise<void>,
  userRegister: () => Promise<void>,

  handleManageSelector: (e: WechatMiniprogram.TouchEvent<{ value: string }, { flag: boolean }>) => void,
}>({

  data: {
    companies: ['666', '777'],
    show: false,

    phone: '',
    password: '',
    company: '',
  },

  onLoad() {
    this.userLogin()
  },

  handleManageSelector(e) {
    console.log(e)
    if (e.type === 'confirm') {
      this.setData({
        company: e.detail.value,
      })
    }
    this.setData({
      show: Boolean(e.mark?.flag),
    })
  },

  async userLogin() {
    const { code } = await wx.login()
    const res = await login(code)
    if (res.code === 0) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else if (res.code === 1070) {
      Toast('请先注册')
    } else {
      Toast.fail(res.data.toString())
    }
  },

  async userRegister() {
    const { phone, password, company } = this.data
    console.log(phone, password, company)
  },

})