Component<{
  active: number
}, {
  items: { value: Array<string>, type: ArrayConstructor}
}, {
  handleSwitch: (e: WechatMiniprogram.TouchEvent<{}, {}, {}, {
    id: number
  }>) => void
}>({

  properties: {
    items: {
      value: [],
      type: Array
    }
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
