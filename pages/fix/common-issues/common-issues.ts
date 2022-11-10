Page<{
  value: string,
  options: Array<Record<'text' | 'value', string>>,
  currentType: string
}, {
  handleIssueChange: (e: VantChange) => void
}>({

  data: {
    value: '',
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
    currentType: ''
  },

  onLoad() {},

  handleIssueChange(e) {
    this.setData({
      value: e.detail as string
    })
    const v: Record<'text' | 'value', string> | undefined = this.data.options.find((v: Record<'text' | 'value', string>) => v.value === e.detail)
    this.selectComponent('#issue-selector').setData({
      val: v?.text
    })
  }

})
