import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'

Page<{
  /**
   * 提交后按钮文字
   */
  text: '返回首页' | '转入人工客服'
}, {
  /**
   * 工单对应服务ID
   */
  sid: number
  /**
   * 工单对应产品ID
   */
  pid: number

  /**
   * 完成提交工单回调方法
   */
  doneSubmit: () => Promise<void>
}>({

  data: {
    text: '返回首页',
  },

  onLoad (options: Record<'sid' | 'pid', string>) {
    this.sid = parseInt(options.sid)
    this.pid = parseInt(options.pid)

    if (this.sid === 5) {
      this.setData({
        text: '转入人工客服',
      })
    }
  },

  sid: 0,
  pid: 0,

  async doneSubmit () {
    if (this.sid === 5) {
      try {
        const res = await getKfLink(this.pid)
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
          Toast.fail(res.data.toString())
        }
      } catch {
        Toast.fail('打开客服服务失败')
      }
    } else {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

})
