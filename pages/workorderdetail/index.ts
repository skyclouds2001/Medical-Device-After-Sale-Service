import Toast from '@vant/weapp/toast/toast'
import { getWorkOrderById } from '@/apis/work-order'
import { services } from '@/data/index'

Page<{
  /**
   * 工单详情信息
   */
  workOrder: WorkOrder & { service?: string }
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
      customer_id: 0,
      model_id: 0,
      model_name: '',
      order_attachment_list: [],
      order_id: 0,
      order_type: 0,
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
          workOrder: {
            ...product,
            service: services.find(v => v.id - 1 === product.order_type)?.text ?? '未知',
          },
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch (err) {
      Toast.fail('加载产品详情失败')
    }
  },

})
