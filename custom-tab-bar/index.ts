const tabs: Array<string> = [
  '/pages/index/index',
  '/pages/fix/fix',
  '/pages/mine/mine'
]

Component<{
  active: number
}, {}, {
  onChange: (e: { detail: number }) => void
}>({

  properties: {},

  data: {
    active: 0,
  },

  methods: {
    onChange(e) {
      wx.switchTab({
        url: tabs[e.detail]
      })
    },
  },

})
