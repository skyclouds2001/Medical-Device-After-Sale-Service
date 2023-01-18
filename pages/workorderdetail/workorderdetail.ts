import { getWorkOrderById } from '@/apis/work-order'
import Toast from '@vant/weapp/toast/toast'

Page<{
  workOrder: WorkOrder
}, {
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
    },
  },

  onLoad (options: { id: string }) {
    this.loadWorkOrderDetail(parseInt(options.id))
  },

  async loadWorkOrderDetail (id) {
    try {
      const res = await getWorkOrderById(id)
      if (res.code === 0) {
        this.setData({
          workOrder: res.data,
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载产品详情失败')
    }
  },

})
