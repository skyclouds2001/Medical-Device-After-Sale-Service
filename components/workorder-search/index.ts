Component<{
  /** 搜索关键字 */
  keywords: string
  /** 排序方式 */
  order: -1 | 0 | 1
  /** 工单状态 */
  status: -1 | 0 | 1
  /** 标记弹窗是否展示 */
  show: boolean
}, {}, {
  /** 弹窗展示回调方法 */
  handleOpen: () => void
  /** 弹窗隐藏回调方法 */
  handleClose: () => void
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
    keywords: '',
    order: -1,
    status: -1,
    show: false,
  },

  methods: {
    handleOpen () {
      this.setData({
        show: true,
      })
    },

    handleClose () {
      this.setData({
        show: false,
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
      const { order, status, keywords } = this.data
      let data = {} as { order?: 0 | 1, status?: 0 | 1, keywords?: string }
      if (order !== -1) data.order = order
      if (status !== -1) data.status = status
      data.keywords = keywords

      this.setData({
        show: false,
      })
      this.triggerEvent('filter', data)
    },
  },

})
