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
    avatar: '/icons/user.svg',
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
  },

})
