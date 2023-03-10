import Toast from '@vant/weapp/toast/toast'
import { getFileList } from '@/apis/file'

Page<{
  files: File[]
}, {
  /**
   * 文件列表所属服务 ID
   *
   * 仅可能为5-培训或6-软件升级(null为初始值)
   */
  sid: null | 5 | 6
  /**
   * 加载文件列表
   *
   * @param type 文件的服务类型
   */
  loadFileList: (type: 0 | 1) => void
}>({

  data: {
    files: [],
  },

  onLoad (options: { sid: '5' | '6' }) {
    const sid = parseInt(options.sid)

    if (sid !== 5 && sid !== 6) {
      Toast.fail('非法的服务类型')

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

      return
    }

    this.sid = sid
    this.loadFileList(sid - 5 as 0 | 1)
  },

  sid: null,

  async loadFileList (type: 0 | 1) {
    try {
      const res = await getFileList(type)
      if (res.code === 0) {
        this.setData({
          files: res.data.file_info_list ?? []
        })
      } else {
        Toast.fail(res.data?.toString() ?? '获取文件列表失败')
      }
    } catch {
      Toast.fail('获取文件列表失败')
    }
  },

})
