import { statuses } from '@/data/index'
import type { Status } from '@/data/index'

Component<{
  statuses: Status[]
  active: number
}, {}, {
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
