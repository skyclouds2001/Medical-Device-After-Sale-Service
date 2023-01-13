import Toast from '@vant/weapp/toast/toast'
import { getHistories, getKfLink } from '@/apis/consult'

Page<{
  conductHistories: ConsultHistory[]
}, {
  conductHistoryPage: number
  conductHistoryPageAmount: number
  loadConductHistory: (first: boolean, page: number) => Promise<void>
  handleConnectKefu: () => void
}>({

  data: {
    conductHistories: [{
      consult_time: '2023年1月11日 11:32:52',
      history_id: 0,
      kf_link: '666',
      topic: '我家的网络不大好，请问是什么原因?',
    }],
  },

  onLoad () {
    this.loadConductHistory(true, 1)
  },

  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 0,
        })
      }
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

  handleConnectKefu () {},

})
