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
        text: 'id-0',
        value: 'id-0',
      },
      {
        text: 'id-1',
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
  }

})
