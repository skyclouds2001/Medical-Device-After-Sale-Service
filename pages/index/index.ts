import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { getUserWorkOrder } from '@/apis/work-order'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'
import { services } from '@/data/index'
import type { Service } from '@/data/index'

const app = getApp<App>()

Page<{
  /**
   * 最近工单列表
   */
  histories: WorkOrder[]
  /**
   * 服务列表
   */
  serviceItems: Service[]
}, {
  /**
   * 加载工单方法
   */
  loadWorkOrderList: () => Promise<void>
  /**
   * 获取客服链接方法
   *
   * @param id 产品ID
   */
  loadKefuLink: (id: number, type: -1 | 1 | 2 | 3) => Promise<string | null>
  /**
   * 跳转服务列表方法
   *
   * @param e 点击事件
   */
  handleCreateWorkOrder: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
  /**
   * 点击联系客服回调方法
   *
   * @param e 点击事件
   */
  handleConnectKefu: () => Promise<void>
  /**
   * 点击查看更多工单回调方法
   */
  handleHistoryWorkOrder: () => void
}>({

  data: {
    histories: [],
    serviceItems: services,
  },

  onLoad () {
    this.loadWorkOrderList()
  },

  onShow () {
    this.getTabBar().setData({
      active: 0,
    })
  },

  async loadWorkOrderList () {
    try {
      const res = await getUserWorkOrder(app.globalData.id)
      if (res.code === 0) {
        this.setData({
          histories: res.data.slice(0, 2),
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载历史工单列表失败')
    }
  },

  async loadKefuLink (id, type) {
    try {
      const res = await getKfLink(id, type)
      if (res.code === 0) {
        return res.data.kf_link
      } else {}
    } catch {}
    return null
  },

  handleCreateWorkOrder (e) {
    const { id } = e.mark!
    wx.navigateTo({
      url: `/pages/fix/fix?sid=${id}`,
    })
  },

  async handleConnectKefu () {
    const link = await this.loadKefuLink(-1, -1)

    if (!link) {
      Toast.fail('获取客服链接失败')
      return
    }

    wx.openCustomerServiceChat({
      extInfo: {
        url: link,
      },
      corpId: CUSTOMER_SERVICE_COMPANY_ID,
      fail: (err) => {
        Toast.fail(err.errMsg)
      },
    })
  },

  handleHistoryWorkOrder () {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },

})
