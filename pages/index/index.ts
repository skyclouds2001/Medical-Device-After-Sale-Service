Page<{}, {}>({

  data: {},

  onLoad () {},

  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 0
        })
      }
  }

})
