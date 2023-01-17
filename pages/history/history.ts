import Toast from '@vant/weapp/toast/toast'
import { getUserWorkOrder } from '@/apis/work-order'

const app = getApp<App>()

Page<{
  wos: WorkOrder[]
}, {
  loadWorkOrderList: () => void
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

})
