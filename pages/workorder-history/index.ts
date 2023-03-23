import Toast from '@vant/weapp/toast/toast'
import { getUserWorkOrder } from '@/apis/work-order'

const app = getApp<App>()

Page<{
  /**
   * 工单列表
   */
  wos: WorkOrder[]
  /**
   * 筛选参数
   */
  filter: { order?: 0 | 1, status?: 0 | 1 }
}, {
  /**
   * 加载工单列表方法
   */
  loadWorkOrderList: () => void
  /**
   * 筛选工单列表方法
   */
  handleFilterWorkOrderList: (wos: WorkOrder[]) => WorkOrder[]
  /**
   * 重置筛选方法
   */
  handleResetFilter: () => void
  /**
   * 使用筛选方法
   */
  handleUseFilter: (e: WechatMiniprogram.CustomEvent<{ order?: 0 | 1, status?: 0 | 1 }>) => void
  /**
   * 点击查看工单详情回调方法
   *
   * @param e 点击事件
   */
  handleWorkOrderDetail: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
}>({

  data: {
    wos: [],
    filter: {},
  },

  onLoad() {
    this.loadWorkOrderList()
  },

  async loadWorkOrderList () {
    const { id } = app.globalData
    try {
      const res = await getUserWorkOrder(id)
      if (res.code === 0) {
        this.setData({
          wos: this.handleFilterWorkOrderList(res.data),
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载历史工单列表失败')
    }
  },

  handleFilterWorkOrderList (wos) {
    const { filter } = this.data
    let data = [...wos]

    if (filter.status !== undefined) {
      data = data.filter(v => filter.status === v.order_status)
    }

    if (filter.order === 0) {
      data.sort((a, b) => new Date(a.create_time).getTime() > new Date(b.create_time).getTime() ? -1 : 1)
    } else if (filter.order === 1) {
      data.sort((a, b) => new Date(a.create_time).getTime() < new Date(b.create_time).getTime() ? -1 : 1)
    }

    return data
  },

  handleResetFilter () {
    this.setData({
      filter: {},
    })
    this.loadWorkOrderList()
  },

  handleUseFilter (e) {
    this.setData({
      filter: { ...e.detail } ?? {},
    })
    this.loadWorkOrderList()
  },

  handleWorkOrderDetail (e) {
    const { id } = e.mark!
    wx.navigateTo({
      url: `/pages/workorder-detail/index?id=${id}`,
    })
  },

})
