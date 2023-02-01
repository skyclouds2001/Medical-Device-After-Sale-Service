import { statuses } from '@/data/index'
import type { Status } from '@/data/index'

Component<{
  /**
   * 工单状态列表
   */
  statuses: Status[]
  /**
   * 当前活跃工单状态
   */
  active: number
}, {}, {
  /**
   * 切换工单状态方法
   *
   * @param e 点击事件
   */
  handleActive: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
}>({

  properties: {},

  data: {
    statuses: statuses,
    active: 0,
  },

  methods: {
    handleActive (e) {
      const { id } = e.mark!
      this.setData({
        active: id,
      })
    },
  },

})
