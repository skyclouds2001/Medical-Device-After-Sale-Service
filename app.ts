import { DEFAULT_NICKNAME, DEFAULT_AVATAR } from '@/config/index'
import { getStorage } from '@/lib/storage'

App<App>({

  globalData: {
    token: '',
    id: 0,
    company: '',
    phone: '',
    userinfo: {
      nickname: '',
      avatar: '',
    },
  },

  onLaunch () {
    const [token, id, company, phone, userinfo] = getStorage('token', 'id', 'company', 'phone', 'userinfo') as [string, number, string, string, UserInfo]
    this.globalData.token = token ?? ''
    this.globalData.id = id ?? ''
    this.globalData.company = company ?? ''
    this.globalData.phone = phone ?? ''
    this.globalData.userinfo.nickname = userinfo?.nickname ?? DEFAULT_NICKNAME
    this.globalData.userinfo.avatar = userinfo?.avatar ?? DEFAULT_AVATAR
  },

})
