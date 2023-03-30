import { getAllProductModels } from '@/apis/product'

Component<{
  /** 产品列表 */
  products: ProductModel[]
  /** 产品筛选 */
  product: number
  /** 排序方式 */
  order: -1 | 0 | 1
  /** 工单状态 */
  status: -1 | 0 | 1
}, {}, {
  /** 选取产品回调方法 */
  handleProductSelect: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
  /** 选取时间排序回调方法 */
  handleTimeSort: (e: WechatMiniprogram.TouchEvent<{}, { id: 0 | 1 }>) => void
  /** 选取工单状态回调方法 */
  handleWorkOrderStatusSelect: (e: WechatMiniprogram.TouchEvent<{}, { id: 0 | 1 }>) => void
  /** 清空筛选排序回调方法 */
  handleReset: () => void
  /** 启用筛选排序回调方法 */
  handleFilter: () => void
}>({

  properties: {},

  data: {
    products: [],
    product: -1,
    order: -1,
    status: -1,
  },

  methods: {
    handleProductSelect (e) {
      const { id } = e.mark!
      const { product } = this.data
      this.setData({
        product: id === product ? -1 : id,
      })
    },

    handleTimeSort (e) {
      const { id } = e.mark!
      const { order } = this.data
      this.setData({
        order: id === order ? -1 : id,
      })
    },

    handleWorkOrderStatusSelect (e) {
      const { id } = e.mark!
      const { status } = this.data
      this.setData({
        status: id === status ? -1 : id,
      })
    },

    handleReset () {
      this.setData({
        order: -1,
        status: -1,
        show: false,
      })
      this.triggerEvent('reset')
    },

    handleFilter () {
      const { order, status, product } = this.data
      let data = {} as { order?: 0 | 1, status?: 0 | 1, product?: number }
      if (order !== -1) data.order = order
      if (status !== -1) data.status = status
      if (product !== -1) data.product = product

      this.setData({
        show: false,
      })

      this.triggerEvent('filter', data)
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
