import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'

Page<{}, {
  /**
   * 工单对应服务ID
   */
  sid: number
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

  onLoad (options: Record<'sid' | 'pid', string>) {
    this.sid = parseInt(options.sid)
    this.pid = parseInt(options.pid)
  },

  sid: 0,
  pid: 0,

  async openCustomerService () {
    try {
      const res = await getKfLink(this.pid, this.sid as 1 | 2 | 3)
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
    } catch (error) {
      console.error(error)
    }
  },

  returnHomePage () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },

})
