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
  handleCancel: () => void
}>({

  properties: {
    show: {
      value: false,
      type: Boolean,
    }
  },

  data: {
    avatar: '',
    nickname: '',
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
    handleCancel () {
      this.triggerEvent('cancel')
    },
  },

})
