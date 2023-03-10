import Toast from '@vant/weapp/toast/toast'
import { getProductModelByModelId } from '@/apis/product'
import { postWorkOrder } from '@/apis/work-order'
import { uploadFile } from '@/lib/file'
import { transformDate } from '@/utils/date'

const app = getApp<App>()

Page<{
  /**
   * 产品名称
   */
  info: string
  /**
   * 产品图片链接
   */
  img_src: string
  /**
   * 联系人姓名
   */
  name: string
  /**
   * 联系人手机
   */
  phone: string
  /**
   * 联系人地址
   */
  address: string
  /**
   * 预约服务时间
   */
  date: string
  /**
   * 其他信息
   */
  addition: string
  /**
   * 图片列表
   */
  images: string[]

  /**
   * 控制日期选择器显示与否
   */
  show: boolean
  /**
   * 日期选择器开始时间
   */
  startDate: number
  /**
   * 日期选择器结束时间
   */
  endDate: number
}, {
  /**
   * 打开日期选择器回调方法
   */
  openDatePicker: () => void
  /**
   * 关闭日期选择器回调方法
   */
  closeDatePicker: () => void
  /**
   * 确认选择日期回调方法
   *
   * @param e 选取日期事件
   */
  confirmChooseDate: (e: {
    detail: number
  }) => void
  /**
   * 取消选择日期回调方法
   */
  cancelChooseDate: () => void
  /**
   * 上传图片回调方法
   *
   * @param e 上传图片事件
   */
  handleUploadImage: (e: {
    detail: {
      file: {
        size: number
        thumb: string
        url: string
        type: 'image'
      }
    }
  }) => void
  /**
   * 删除图片回调方法
   *
   * @param e 删除图片事件
   */
  handleDeleteImage: (e: {
    detail: {
      file: string
      index: number
      name: string
    }
  }) => void
  /**
   * 提交工单方法
   */
  submitWorkOrder: () => Promise<void>

  /**
   * 工单所属产品ID
   */
  pid: number
  /**
   * 工单所属服务ID
   */
  sid: number
  /**
   * 加载产品模型方法
   */
  loadProductModel: (id: number) => Promise<void>
}>({

  data: {
    info: '',
    name: '',
    phone: '',
    address: '',
    date: '',
    addition: '',
    img_src: '',
    images: [],

    show: false,
    startDate: Number.MIN_VALUE,
    endDate: Number.MAX_VALUE,
  },

  onLoad (options: { sid: string, pid: string }) {
    this.pid = parseInt(options.pid)
    this.sid = parseInt(options.sid)
    this.loadProductModel(parseInt(options.pid))

    const current = new Date().getTime()
    this.setData({
      startDate: current - current % (1000 * 60) + 1000 * 60 * 60,
      endDate: current - current % (1000 * 60) + 60 * 1000 + 1000 * 60 * 60 * 24 * 365,
    })
  },

  pid: 0,
  sid: 0,

  async loadProductModel (id) {
    try {
      const res = await getProductModelByModelId(id)
      if (res.code === 0) {
        this.setData({
          info: res.data.model_name,
          img_src: res.data.pic_url ?? '',
        })
      } else {
        Toast.fail(res.data?.toString() ?? '加载产品详情失败')
      }
    } catch {
      Toast.fail('加载产品详情失败')
    }
  },

  openDatePicker () {
    this.setData({
      show: true,
    })
  },

  closeDatePicker () {
    this.setData({
      show: false,
    })
  },

  confirmChooseDate (e) {
    this.setData({
      date: transformDate(new Date(e.detail)),
    })
    this.closeDatePicker()
  },

  cancelChooseDate () {
    this.closeDatePicker()
  },

  async handleUploadImage (e) {
    const { file } = e.detail
    const { images } = this.data
    this.setData({
      images: [...images, file.url],
    })
    try {
      const res = await uploadFile({
        url: '/wizz/aftersale/media/upload',
        filePath: file.url,
        name: 'file',
      })
      const result: Response<string> = JSON.parse(res.data)
      if (result.code === 0) {
        this.setData({
          images: [...images, result.data],
        })
      } else {
        Toast.fail(result.data?.toString() ?? '上传图片失败')
        this.setData({
          images: [...images],
        })
      }
    } catch {
      Toast.fail('上传图片失败')
    }
  },

  handleDeleteImage (e) {
    const { file } = e.detail
    const { images } = this.data
    this.setData({
      images: images.filter(v => v !== file),
    })
  },

  async submitWorkOrder () {
    const { address, date, images } = this.data
    const { id: cid } = app.globalData
    const { pid, sid  } = this
    try {
      const res = await postWorkOrder(address, date, cid, pid, images.map((v, i) => ({
        storage_path: v,
        serial_number: i,
      })), sid - 1)
      if (res.code === 0) {
        Toast.success('提交成功')
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/submited/index?sid=${sid}&pid=${pid}`,
          })
        }, 2000)
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('提交失败')
    }
  },

})
