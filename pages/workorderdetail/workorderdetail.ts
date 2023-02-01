import { getWorkOrderById } from '@/apis/work-order'
import Toast from '@vant/weapp/toast/toast'

Page<{
  /**
   * 工单详情信息
   */
  workOrder: WorkOrder
}, {
  /**
   * 加载工单详情回调方法
   */
  loadWorkOrderDetail: (id: number) => void
}>({

  data: {
    workOrder: {
      address: '',
      appointment_time: '',
      customer_id: -1,
      model_id: -1,
      model_name: '',
      order_attachment_list: [],
      order_id: -1,
    },
  },

  onLoad (options: { id: string }) {
    this.loadWorkOrderDetail(parseInt(options.id))
  },

  async loadWorkOrderDetail (id) {
    try {
      const res = await getWorkOrderById(id)
      if (res.code === 0) {
        const product = res.data
        this.setData({
          workOrder: { ...product },
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载产品详情失败')
    }
  },

})
