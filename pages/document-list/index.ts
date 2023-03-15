import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { getFileList } from '@/apis/file'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'
import { downloadFile } from '@/lib/file'

const fs = wx.getFileSystemManager()

Page<{
  files: Array<File & { file_type?: string }>
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
  handleConnectKefu: () => void
  /**
   * 下载文档方法
   */
  handleDownloadDocument: (e: WechatMiniprogram.TouchEvent<{}, { url: string }>) => void
  /**
   * 预览文档方法
   */
  handlePreviewDocument: (e: WechatMiniprogram.TouchEvent<{}, { url: string }>) => void
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
          files: res.data.file_info_list.map((v: File & { file_type?: string }) => {
            if (/\.docx/.test(v.file_url)) {
              v.file_type = 'DOCX'
            } else if (/\.xlsx/.test(v.file_url)) {
              v.file_type = 'XLSX'
            } else if (/\.pptx/.test(v.file_url)) {
              v.file_type = 'PPT'
            } else if (/\.pdf/.test(v.file_url)) {
              v.file_type = 'PDF'
            } else if (/\.zip/.test(v.file_url)) {
              v.file_type = 'ZIP'
            } else {
              v.file_type = 'unknown'
            }
            return v
          }) ?? []
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

  async handleDownloadDocument (e) {
    if (!e.mark?.url) return

    const res = await downloadFile({
      url: e.mark.url,
    })

    try {
      fs.accessSync(`${wx.env.USER_DATA_PATH}/medical-device-service`)
    } catch {
      try {
        fs.mkdirSync(`${wx.env.USER_DATA_PATH}/medical-device-service`, true)
      } catch {}
    }

    const name = res.tempFilePath.slice(res.tempFilePath.indexOf('tmp/') + 4)

    fs.saveFileSync(res.tempFilePath, `${wx.env.USER_DATA_PATH}/medical-device-service/${name}`)
  },

  async handlePreviewDocument (e) {
    if (!e.mark?.url) return

    const res = await downloadFile({
      url: e.mark.url,
    })

    wx.openDocument({
      filePath: res.tempFilePath,
      showMenu: true,
    })
  },

})
