import { tabs } from '@/data/index'
import type { Tab } from '@/data/index'

Component<{
  /**
   * 当前活跃的TabbarItem
   */
  active: number
  /**
   * Tabbar选项
   */
  tabs: Tab[]
}, {}, {
  /**
   * TabbarItem点击切换回调方法
   */
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
