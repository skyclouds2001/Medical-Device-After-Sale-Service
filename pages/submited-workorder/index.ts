import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'

Page<{}, {
  /**
   * 工单ID
   */
  wid: number
  /**
   * 工单对应服务ID
   */
  sid: -1 | 1 | 2 | 3 | 4
  /**
   * 工单对应产品ID
   */
  pid: number

  /**
   * 打开客服回调方法
   */
  openCustomerService: () => void
  /**
   * 返回首页回调方法
   */
  returnHomePage: () => void
}>({

  data: {},

  onLoad (options: Record<'sid' | 'pid' | 'wid', string>) {
    this.sid = parseInt(options.sid) as 1 | 2 | 3 | 4
    this.pid = parseInt(options.pid)
    this.wid = parseInt(options.wid)
  },

  onAddToFavorites () {
    return {}
  },

  onShareAppMessage () {
    return {}
  },

  onShareTimeline () {
    return {}
  },

  sid: -1,
  pid: -1,
  wid: -1,

  async openCustomerService () {
    try {
      const res = await getKfLink(this.pid, this.sid, this.wid)
      if (res.code === 0) {
        wx.openCustomerServiceChat({
          extInfo: {
            url: res.data.kf_link,
          },
          corpId: CUSTOMER_SERVICE_COMPANY_ID,
          fail: (err) => {
            Toast.fail(err.errMsg)
          },
        })
      } else {
        Toast.fail(res.data?.toString() ?? '获取客服链接失败')
      }
    } catch {
      Toast.fail('获取客服链接失败')
    }
  },

  returnHomePage () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },

})
