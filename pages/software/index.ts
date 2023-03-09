Page<{
  /** 待打开网页链接 */
  url: string
}, {}>({

  data: {
    url: 'https://www.baidu.com',
  },

  onLoad (options: Record<'sid' | 'pid', string>) {
    console.log(options)
  },

})
