Page<{}, {
  sid: number
  pid: number

  doneSubmit: () => void
}>({

  data: {},

  onLoad (options: Record<'sid' | 'pid', string>) {
    this.sid = parseInt(options.sid)
    this.pid = parseInt(options.pid)
  },

  sid: 0,
  pid: 0,

  doneSubmit () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

})
