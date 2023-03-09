Page<{
  /**
   * 提交后按钮文字
   */
  text: '返回首页' | '转入人工客服'
}, {
  /**
   * 工单对应服务ID
   */
  sid: number
  /**
   * 工单对应产品ID
   */
  pid: number

  /**
   * 完成提交工单回调方法
   */
  doneSubmit: () => Promise<void>
}>({

  data: {
    text: '返回首页',
  },

  onLoad (options: Record<'sid' | 'pid', string>) {
    this.sid = parseInt(options.sid)
    this.pid = parseInt(options.pid)

    if (this.sid === 5) {
      this.setData({
        text: '转入人工客服',
      })
    }
  },

  sid: 0,
  pid: 0,

  async doneSubmit () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },

})
