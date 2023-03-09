interface File {
  id: number
  name: string
  type: 'DOCX' | 'XLSX' | 'PPTX' | 'PDF' | 'unknown'
  size: string
  date: string
}

const files: File[] = [
  {
    id: 1,
    name: '产品详情文件1',
    type: 'DOCX',
    size: '12.9MB',
    date: '2023-3-6',
  },
]

Page<{
  files: File[]
}, {}>({

  data: {
    files: [...files],
  },

  onLoad() {},

})
