Page<{
  list_items: string[]
}, {
  handleSwitch: (e: WechatMiniprogram.CustomEvent<{ current: number }>) => void
}>({

  data: {
    list_items: ["XX仪器","XX仪器","XX仪器","XX仪器","XX仪器"]
  },

  onLoad () {},

  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 1
        })
      }
  },

  handleSwitch(e) {
    console.log(e, e.detail.current);
  }

})
