import Toast from '@vant/weapp/toast/toast'
import { getProductModelByModelId } from '@/apis/product'
import { postWorkOrder } from '@/apis/work-order'
import { DEFAULT_PRODUCT_IMG_SRC } from '@/config/index'
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
   * 控制日期选择器显示与否
   */
  show: boolean
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
  confirmChooseDate: (e: { detail: number }) => void
  /**
   * 取消选择日期回调方法
   */
  cancelChooseDate: () => void
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
    show: false,
    name: '',
    phone: '',
    address: '',
    date: '',
    addition: '',
    img_src: '',
  },

  onLoad (options: { sid: string, pid: string }) {
    this.loadProductModel(parseInt(options.pid))
    this.pid = parseInt(options.pid)
    this.sid = parseInt(options.sid)
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
        Toast.fail(res.data.toString())
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

  async submitWorkOrder () {
    const { address, date } = this.data
    const { id: cid } = app.globalData
    const { pid, sid  } = this
    try {
      const res = await postWorkOrder(address, date, cid, pid, [], sid)
      if (res.code === 0) {
        Toast.success('提交成功')
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/submited/submited?sid=${sid}&pid=${pid}`,
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
