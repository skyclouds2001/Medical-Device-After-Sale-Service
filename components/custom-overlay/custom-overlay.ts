Component<{}, {
  show: {
    value: boolean,
    type: BooleanConstructor
  }
}, {
  handleCloseOverlay: () => void
}>({
  
  properties: {
    show: {
      value: false,
      type: Boolean
    }
  },

  data: {},

  methods: {
    handleCloseOverlay() {
      this.triggerEvent('close-overlay', 'close')
    }
  }
  
})
