import Toast from '@vant/weapp/toast/toast'
import { getWorkOrderById } from '@/apis/work-order'
import { basicServices } from '@/data/index'
import type WorkOrder from '@/models/WorkOrder'

Page<{
  /**
   * 工单详情信息
   */
  workOrder: WorkOrder & { service?: string } | null
}, {
  /**
   * 加载工单详情回调方法
   */
  loadWorkOrderDetail: (id: number) => void
}>({

  data: {
    workOrder: null,
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
            service: basicServices.find(v => v.id - 1 === product.order_type)?.text ?? '未知',
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
