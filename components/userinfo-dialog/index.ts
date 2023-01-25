import { DEFAULT_NICKNAME, DEFAULT_AVATAR } from '@/config/index'

Component<{
  avatar: string
  nickname: string
}, {
  show: {
    value: boolean
    type: BooleanConstructor
  }
}, {
  getUserAvatar: (e: WechatMiniprogram.TouchEvent<{ avatarUrl: string }>) => void
  handleConfirm: () => void
}>({

  properties: {
    show: {
      value: false,
      type: Boolean,
    }
  },

  data: {
    avatar: DEFAULT_AVATAR,
    nickname: DEFAULT_NICKNAME,
  },

  methods: {
    getUserAvatar (e) {
      this.setData({
        avatar: e.detail.avatarUrl,
      })
    },
    handleConfirm () {
      const { nickname, avatar } = this.data
      this.triggerEvent('confirm', { nickname, avatar })
    },
  },

})
