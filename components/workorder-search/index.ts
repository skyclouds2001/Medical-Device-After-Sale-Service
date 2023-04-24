import { getAllProductModels } from '@/apis/product'
import type Product from '@/models/Product'

Component<{
  /** 产品筛选 */
  product: number
  /** 排序方式 */
  order: 0 | 1
  /** 工单状态 */
  status: -1 | 0 | 1

  /** 产品列表 */
  products: Product[]
}, {}, {
  /** 选取产品回调方法 */
  handleProductSelect: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
  /** 选取时间排序回调方法 */
  handleTimeSort: (e: WechatMiniprogram.TouchEvent<{}, { id: 0 | 1 }>) => void
  /** 选取工单状态回调方法 */
  handleWorkOrderStatusSelect: (e: WechatMiniprogram.TouchEvent<{}, { id: -1 | 0 | 1 }>) => void
}>({

  properties: {},

  data: {
    product: -1,
    order: 0,
    status: -1,

    products: [],
  },

  methods: {
    handleProductSelect (e) {
      const { id } = e.mark!
      const { status, order } = this.data
      this.triggerEvent('filter', { status, order, product: id })
      this.setData({
        product: id,
      })
    },

    handleTimeSort (e) {
      const { id } = e.mark!
      const { status, product } = this.data
      this.triggerEvent('filter', { status, order: id, product })
      this.setData({
        order: id,
      })
    },

    handleWorkOrderStatusSelect (e) {
      const { id } = e.mark!
      const { order, product } = this.data
      this.triggerEvent('filter', { status: id, order, product })
      this.setData({
        status: id,
      })
    },
  },

  lifetimes: {
    attached () {
      getAllProductModels().then(res => {
        if (res.code !== 0) throw ''
        this.setData({
          products: res.data ?? [],
        })
      }).catch(() => {})
    },
  },

})
