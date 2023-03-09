Component<{
  /**
   * 搜索关键字
   */
  keywords: string
}, {
  /**
   * 搜索框平移距离
   *
   * 基于 CSS transition 属性
   */
  move: {
    value: string,
    type: StringConstructor
  }
}, {}>({

  properties: {
    move: {
      value: '',
      type: String
    }
  },

  data: {
    keywords: ''
  },

  methods: {}

})
