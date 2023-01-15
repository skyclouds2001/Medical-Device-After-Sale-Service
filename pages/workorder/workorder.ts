import Toast from '@vant/weapp/toast/toast'
import { getProductModelByModelId } from '@/apis/product'
import { postWorkOrder } from '@/apis/work-order'
import { transform } from '@/utils/date'

const app = getApp<App>()

Page<{
  info: string
  show: boolean
  name: string
  phone: string
  address: string
  date: string
  addition: string
}, {
  openDatePicker: () => void
  closeDatePicker: () => void
  confirmChooseDate: (e: { detail: number }) => void
  cancelChooseDate: () => void
  submitWorkOrder: () => Promise<void>

  pid: number
  sid: number
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
      date: transform(new Date(e.detail)),
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
      const res = await postWorkOrder(address, date, cid, pid, [{ storage_path: 'ls', serial_number: 1 }])
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
