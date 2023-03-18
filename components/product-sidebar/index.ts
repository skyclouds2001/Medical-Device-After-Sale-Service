Component<{
  /**
   * 当前活跃产品大类
   */
  active: number,
}, {
  /**
   * 产品大类列表
   */
  items: {
    value: ProductType[],
    type: ArrayConstructor,
  },
}, {
  /**
   * 切换产品大类回调
   *
   * @param e 点击事件
   */
  handleSwitch: (e: WechatMiniprogram.TouchEvent<{}, {}, {}, {
    id: number,
  }>) => void,
}>({

  properties: {
    items: {
      value: [],
      type: Array,
    },
  },

  data: {
    active: -1,
  },

  methods: {
    handleSwitch(e) {
      const { id } = e.target.dataset
      this.setData({
        active: id,
      })
      this.triggerEvent('change', {
        current: id,
      })
    },
  },

})
