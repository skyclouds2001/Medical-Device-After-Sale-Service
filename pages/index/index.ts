import Toast from '@vant/weapp/toast/toast'
import { getHistories, getKfLink } from '@/apis/consult'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'
import { services } from '@/data/index'
import type { Service } from '@/data/index'

Page<{
  conductHistories: ConsultHistory[]
  serviceItems: Service[]
}, {
  conductHistoryPage: number
  conductHistoryPageAmount: number

  loadConductHistory: (first: boolean, page: number) => Promise<void>
  loadKefuLink: (id: number) => Promise<string | null>

  handleCreateWorkOrder: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
  handleConnectKefu: (e: WechatMiniprogram.TouchEvent<{}, { link?: string }>) => Promise<void>
}>({

  data: {
    conductHistories: [{
      consult_time: '2023年1月11日 11:32:52',
      history_id: 0,
      kf_link: '666',
      topic: '我家的网络不大好，请问是什么原因?',
    }],
    serviceItems: services,
  },

  onLoad () {
    this.loadConductHistory(true, 1)
  },

  onShow () {
    this.getTabBar().setData({
      active: 0,
    })
  },

  onReachBottom () {
    if (this.conductHistoryPage < this.conductHistoryPageAmount) {
      this.conductHistoryPage += 1
      this.loadConductHistory(false, this.conductHistoryPage)
    }
  },

  conductHistoryPage: 1,
  conductHistoryPageAmount: 0,

  async loadConductHistory (first, page) {
    if (!first && page > this.conductHistoryPage) return

    try {
      const res = await getHistories(first, page)

      if (res.code === 0) {
        const { conductHistories: histories } = this.data
        this.setData({
          conductHistories: [...histories, ...res.data.history_list],
        })
        if (first) this.conductHistoryPageAmount = res.data.total_page_num
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('加载咨询历史列表失败')
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

})
