import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { getUserWorkOrder } from '@/apis/work-order'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'
import { services } from '@/data/index'
import type { Service } from '@/data/index'

const app = getApp<App>()

Page<{
  histories: WorkOrder[]
  serviceItems: Service[]
}, {
  loadWorkOrderList: () => Promise<void>
  loadKefuLink: (id: number) => Promise<string | null>

  handleCreateWorkOrder: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
  handleConnectKefu: (e: WechatMiniprogram.TouchEvent<{}, { link?: string }>) => Promise<void>
  handleHistoryWorkOrder: () => void
  handleWorkOrderDetail: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
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

  async loadKefuLink (id) {
    try {
      const res = await getKfLink(id)
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

  async handleConnectKefu (e) {
    const link = e.mark?.link ?? (await this.loadKefuLink(-1))

    if (!link) {
      Toast.fail('获取客服链接失败')
      return
    }

    wx.openCustomerServiceChat({
      extInfo: {
        url: link!,
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

  handleWorkOrderDetail (e) {
    const { id } = e.mark!
    wx.navigateTo({
      url: `/pages/workorderdetail/workorderdetail?id=${id}`,
    })
  },

})
