import { getStorage } from '@/lib/storage'

App<App>({

  globalData: {
    token: '',
    id: 0,
    userinfo: {
      nickname: '',
      avatar: '',
    },
  },

  onLaunch () {
    const [token, id, userinfo] = getStorage('token', 'id', 'userinfo') as [string, number, UserInfo]
    this.globalData.token = token ?? ''
    this.globalData.id = id ?? ''
    this.globalData.userinfo.nickname = userinfo?.nickname ?? '点击登录'
    this.globalData.userinfo.avatar = userinfo?.avatar ?? '/icons/user.svg'
  },

})
