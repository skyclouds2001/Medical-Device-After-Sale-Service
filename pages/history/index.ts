import Toast from '@vant/weapp/toast/toast'
import { getUserWorkOrder } from '@/apis/work-order'

const app = getApp<App>()

Page<{
  /**
   * 工单列表
   */
  wos: WorkOrder[]
}, {
  /**
   * 加载工单列表方法
   */
  loadWorkOrderList: () => void
  /**
   * 点击查看工单详情回调方法
   *
   * @param e 点击事件
   */
  handleWorkOrderDetail: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
}>({

  data: {
    wos: [],
  },

  onLoad() {
    this.loadWorkOrderList()
  },

  async loadWorkOrderList () {
    try {
      const res = await getUserWorkOrder(app.globalData.id)
      if (res.code === 0) {
        this.setData({
          wos: res.data,
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载历史工单列表失败')
    }
  },

  handleWorkOrderDetail (e) {
    const { id } = e.mark!
    wx.navigateTo({
      url: `/pages/workorderdetail/index?id=${id}`,
    })
  },

})
