Page<{
  value: string,
  options: Array<Record<'text' | 'value', string>>
}, {
  handleIssueChange: (e: { detail: string }) => void
}>({

  data: {
    value: 'id-0',
    options: [
      {
        text: 'id-00',
        value: 'id-0',
      },
      {
        text: 'id-11',
        value: 'id-1',
      }
    ],
  },

  onLoad() {},

  handleIssueChange(e) {
    this.setData({
      value: e.detail
    })
    const v = this.data.options.find(v => v.value === e.detail)
    this.selectComponent('#issue-selector').setData({
      val: v?.text
    })
  }

})
