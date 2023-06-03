import Toast from '@vant/weapp/toast/toast'
import { areaList } from '@vant/area-data'
import { getAllProductModels } from '@/apis/product'
import { postWorkOrder } from '@/apis/work-order'
import { basicServices as services } from '@/data/index'
import { uploadFile } from '@/lib/file'
import { transformDate } from '@/utils/date'
import { validatePhone } from '@/utils/validate'
import type App from '@/models/App'
import type Product from '@/models/Product'
import type Response from '@/models/Response'

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
   * 产品ID
   */
  pid: number
  /**
   * 联系人姓名
   */
  name: string
  /**
   * 联系人手机
   */
  phone: string
  /**
   * 联系人地区
   */
  area: string
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
  images: Array<{
    url: string
    name: string
  }>

  /**
   * 服务名称
   */
  service: string
  /**
   * 产品列表
   */
  products: Array<Product & { name: string }>
  /**
   * 控制产品选择器显示与否
   */
  showProductPicker: boolean
  /**
   * 控制日期选择器显示与否
   */
  showDatePicker: boolean
  /**
   * 控制地区选择器显示与否
   */
  showAreaPicker: boolean
  /**
   * 日期选择器开始时间
   */
  startDate: number
  /**
   * 日期选择器结束时间
   */
  endDate: number
  /**
   * 地区列表
   */
  areas: typeof areaList,
  /**
   * 是否提交中
   */
  submitting: boolean
}, {
  /**
   * 打开产品选择器回调方法
   */
  openProductPicker: () => void
  /**
   * 关闭产品选择器回调方法
   */
  closeProductPicker: () => void
  /**
   * 打开日期选择器回调方法
   */
  openDatePicker: () => void
  /**
   * 关闭日期选择器回调方法
   */
  closeDatePicker: () => void
  /**
   * 打开地区选择器回调方法
   */
  openAreaPicker: () => void
  /**
   * 关闭地区选择器回调方法
   */
  closeAreaPicker: () => void
  /**
   * 选择产品回调方法
   */
  handleSelectProduct: (e: WechatMiniprogram.CustomEvent<Product & { name: string }>) => void
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
   * 确认选择地区回调方法
   *
   * @param e 选取地区事件
   */
  confirmChooseArea: (e: {
    detail: {
      index: number[]
      values: Array<{
        code: string
        name: string
      }>
    }
  }) => void
  /**
   * 取消选择地区回调方法
   */
  cancelChooseArea: () => void
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
      file: {
        url: string
        name: string
      }
      index: number
      name: string
    }
  }) => void
  /**
   * 提交工单方法
   */
  submitWorkOrder: () => Promise<void>

  /**
   * 工单所属服务ID
   */
  sid: number
  /**
   * 产品列表
   */
  products: Product[]
  /**
   * 加载产品模型方法
   */
  loadProductModels: () => Promise<void>
}>({

  data: {
    pid: 0,
    info: '',
    name: '',
    phone: '',
    area: '',
    address: '',
    date: '',
    addition: '',
    img_src: '',
    images: [],

    showProductPicker: false,
    showDatePicker: false,
    showAreaPicker: false,
    products: [],
    service: '',
    startDate: Number.MIN_VALUE,
    endDate: Number.MAX_VALUE,
    areas: areaList,
    submitting: false,
  },

  onLoad (options: { sid: string }) {
    this.loadProductModels()
    this.sid = parseInt(options.sid)

    const service = services.find(v => v.id === this.sid)

    const current = new Date().getTime()
    this.setData({
      startDate: current - current % (1000 * 60) + 1000 * 60 * 60,
      endDate: current - current % (1000 * 60) + 60 * 1000 + 1000 * 60 * 60 * 24 * 365,
      service: service?.text ?? '维修',
    })
  },

  onAddToFavorites () {
    return {}
  },

  onShareAppMessage () {
    return {}
  },

  onShareTimeline () {
    return {}
  },

  sid: 0,
  products: [],

  async loadProductModels () {
    try {
      const res = await getAllProductModels()
      if (res.code === 0) {
        this.products = res.data
        this.setData({
          products: res.data.map(v => ({ ...v, name: v.model_name })),
        })
      } else {
        Toast.fail(res.data?.toString() ?? '加载产品详情失败')
      }
    } catch {
      Toast.fail('加载产品详情失败')
    }
  },

  openProductPicker () {
    this.setData({
      showProductPicker: true,
    })
  },

  closeProductPicker () {
    this.setData({
      showProductPicker: false,
    })
  },

  openDatePicker () {
    this.setData({
      showDatePicker: true,
    })
  },

  closeDatePicker () {
    this.setData({
      showDatePicker: false,
    })
  },

  openAreaPicker () {
    this.setData({
      showAreaPicker: true,
    })
  },

  closeAreaPicker () {
    this.setData({
      showAreaPicker: false,
    })
  },

  handleSelectProduct (e) {
    const { model_id: id, model_name: name, pic_url } = e.detail
    this.setData({
      pid: id,
      info: name,
      img_src: pic_url,
    })
  },

  confirmChooseDate (e) {
    this.setData({
      date: transformDate(new Date(e.detail)).split(' ')[0],
    })
    this.closeDatePicker()
  },

  cancelChooseDate () {
    this.closeDatePicker()
  },

  confirmChooseArea (e) {
    this.setData({
      area: e.detail.values.map((v, i) => i === 0 && ['110000', '120000', '310000', '500000'].includes(v.code) ? '' : v.name).join('')
    })
    this.closeAreaPicker()
  },

  cancelChooseArea () {
    this.closeAreaPicker()
  },

  async handleUploadImage (e) {
    const { file } = e.detail
    const { images } = this.data

    this.setData({
      images: [...images, {
        url: file.url,
        name: '',
      }],
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
          images: [...images, {
            url: result.data,
            name: '',
          }],
        })
      } else {
        Toast.fail(result.data?.toString() ?? '上传图片失败')
        this.setData({
          images: [...images],
        })
      }
    } catch {
      Toast.fail('上传图片失败')
      this.setData({
        images: [...images],
      })
    }
  },

  handleDeleteImage (e) {
    const { file } = e.detail
    const { images } = this.data

    this.setData({
      images: images.filter(v => v.url !== file.url),
    })
  },

  async submitWorkOrder () {
    const { address, date, images, pid, addition, name, phone, area } = this.data
    const { id: cid } = app.globalData
    const { sid  } = this

    if (!pid) {
      Toast.fail('请选择产品')
      return
    }
    if (!name) {
      Toast.fail('请填写联系人信息')
      return
    }
    if (!phone) {
      Toast.fail('请填写联系人电话')
      return
    }
    if (!address || !area) {
      Toast.fail('请填写地址')
      return
    }
    if (!date) {
      Toast.fail('请选择预约服务时间')
      return
    }
    if (!addition) {
      Toast.fail('请填写工单问题描述')
      return
    }
    if (!validatePhone(phone)) {
      Toast.fail('请填写正确格式的电话号码')
      return
    }

    try {
      this.setData({
        submitting: true,
      })
      const res = await postWorkOrder(`${area}${address}`, `${date} 00:00:00`, cid, pid, images.map((v, i) => ({
        storage_path: v.url,
        serial_number: i,
      })), sid - 1, addition)
      if (res.code === 0) {
        Toast.success('提交成功')
        const wid = res.data
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/submited-workorder/index?sid=${sid}&pid=${pid}&wid=${wid}`,
          })
        }, 2000)
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('提交失败')
    } finally {
      this.setData({
        submitting: false,
      })
    }
  },

})
