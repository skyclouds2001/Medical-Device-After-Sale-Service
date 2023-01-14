import { tabs } from '@/data/index'
import type { Tab } from '@/data/index'

Component<{
  active: number
  tabs: Tab[]
}, {}, {
  onChange: (e: { detail: number }) => void
}>({

  properties: {},

  data: {
    active: 1,
    tabs: tabs,
  },

  methods: {
    onChange(e) {
      wx.switchTab({
        url: tabs[e.detail].path
      })
    },
  },

})
