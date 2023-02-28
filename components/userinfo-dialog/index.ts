Component<{
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户昵称
   */
  nickname: string
}, {
  /**
   * 弹窗显示与否
   */
  show: {
    value: boolean
    type: BooleanConstructor
  }
}, {
  /**
   * 获取用户昵称回调
   *
   * @param e 获取用户昵称回调方法
   */
  getUserAvatar: (e: WechatMiniprogram.TouchEvent<{ avatarUrl: string }>) => void
  /**
   * 确认登录回调
   */
  handleConfirm: () => void
  /**
   * 取消登录回调
   */
  handleCancel: () => void
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
    handleCancel () {
      this.triggerEvent('cancel')
    },
  },

})
