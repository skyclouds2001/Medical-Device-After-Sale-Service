import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { getFileList } from '@/apis/file'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'

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
  /**
   * 点击联系客服回调方法
   *
   * @param e 点击事件
   */
  handleConnectKefu: () => Promise<void>
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

  async handleConnectKefu () {
    try {
      const res = await getKfLink(-1, -1, -1)
      if (res.code === 0) {
        wx.openCustomerServiceChat({
          extInfo: {
            url: res.data.kf_link,
          },
          corpId: CUSTOMER_SERVICE_COMPANY_ID,
          fail: (err) => {
            Toast.fail(err.errMsg)
          },
        })
      } else {
        Toast.fail(res.data?.toString() ?? '获取客服链接失败')
      }
    } catch {
      Toast.fail('获取客服链接失败')
    }
  },

})
