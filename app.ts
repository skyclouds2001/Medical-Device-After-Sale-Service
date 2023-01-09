import { login } from '@/apis/index'

App<App>({

  globalData: {},

  async onLaunch () {
    try {
      const { code } = await wx.login()
      const res = await login(code)
      console.log(res)
      if (res.code === 0) {} else if (res.code === 1070) {} else {}
    } catch {}
  }

})
