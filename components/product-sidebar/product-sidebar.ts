Component<{
  active: number
}, {
  items: ArrayConstructor
}, {
  handleSwitch: (e: WechatMiniprogram.TouchEvent<{}, {}, {}, {
    id: number
  }>) => void
}>({

  properties: {
    items: Array
  },

  data: {
    active: 0
  },

  methods: {
    handleSwitch(e) {
      const { id } = e.target.dataset;
      this.setData({
        active: id
      })
      this.triggerEvent('change', { current: id })
    }
  }

})
