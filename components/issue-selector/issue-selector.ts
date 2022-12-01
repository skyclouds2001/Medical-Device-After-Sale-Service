Component<{
  show: boolean,
  val: string | null
}, {
  options: {
    value: Array<object>,
    type: ArrayConstructor
  },
  value: {
    value: string,
    type: StringConstructor
  },
}, {
  handleSelectItem: (e: WechatMiniprogram.TouchEvent<Record<string, number>, { id: string }>) => void
  handleStartSelect: () => void,
  handleEndSelect: () => void
}>({
  
  properties: {
    options: {
      value: [],
      type: Array
    },
    value: {
      value: '',
      type: String
    }
  },

  data: {
    show: false,
    val: null
  },

  methods: {
    handleSelectItem(e) {
      const { id } = e.mark as { id: string }
      this.triggerEvent('select-issue', id)
      this.handleEndSelect()
    },
    handleStartSelect() {
      this.setData({
        show: true
      })
    },
    handleEndSelect() {
      this.setData({
        show: false
      })
    }
  },

  lifetimes: {
    attached: function() {
      const v: Record<'text' | 'value', string> = this.properties.options.find((v: Record<'text' | 'value', string>) => v.value === this.properties.value)
      this.setData({
        val: v?.text ?? null
      })
    }
  }

})
