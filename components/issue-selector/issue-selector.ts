Component<{
  show: boolean
}, {
  options: {
    value: Array<object>,
    type: ArrayConstructor
  },
  value: {
    value: string,
    type: StringConstructor
  },
}, {}>({
  
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
    show: false
  },

  methods: {
    handleSelectItem() {}
  }

})
