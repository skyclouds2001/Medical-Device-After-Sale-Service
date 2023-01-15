Page<{}, {
  doneSubmit: () => void
}>({

  data: {},

  onLoad () {},

  doneSubmit () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

})
