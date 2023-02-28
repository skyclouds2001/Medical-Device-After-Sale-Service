import Toast from '@vant/weapp/toast/toast'
import { getKfLink } from '@/apis/consult'
import { getAllProductTypes, getProductModelByTypeId } from '@/apis/product'
import { CUSTOMER_SERVICE_COMPANY_ID } from '@/config/index'

Page<{
  /**
   * 产品大类列表
   */
  productTypes: ProductType[]
  /**
   * 当前产品大类
   */
  currentType: number
  /**
   * 产品大类对应产品类型列表
   */
  productModels: ProductModel[]
}, {
  /**
   * 服务类型ID
   */
  sid: number

  /**
   * 加载产品大类列表方法
   */
  loadProductTypes: () => Promise<void>
  /**
   * 加载产品类型方法
   */
  loadProductModels: (current?: number) => Promise<void>

  /**
   * 切换产品大类回调方法
   */
  handleSwitch: (e: WechatMiniprogram.TouchEvent<{ current: number }>) => void
  /**
   * 点击选取工单方法
   */
  handleCreateWorkOrder: (e: WechatMiniprogram.TouchEvent<{}, { id: number }>) => void
}>({

  data: {
    productTypes: [],
    currentType: -1,
    productModels: [],
  },

  onLoad (options: { sid: string }) {
    this.sid = parseInt(options.sid)
    this.loadProductTypes()
  },

  sid: 0,

  async loadProductTypes () {
    try {
      const res = await getAllProductTypes()
      if (res.code === 0) {
        const types = res.data
        const current = types[0].type_id
        this.setData({
          productTypes: types,
          currentType: current,
        })
        this.selectComponent('.sidebar').setData({
          active: current,
        })
        this.loadProductModels(current)
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('加载产品大类列表失败')
    }
  },

  async loadProductModels (current?: number) {
    const { currentType } = this.data
    try {
      const res = await getProductModelByTypeId(current ?? currentType)
      if (res.code === 0) {
        const models = res.data
        this.setData({
          productModels: models,
        })
      } else {
        Toast.fail(res.data.toString())
      }
    } catch {
      Toast.fail('加载产品列表失败')
    }
  },

  handleSwitch (e) {
    const { current } = e.detail
    this.loadProductModels(current)
    this.setData({
      currentType: current,
    })
  },

  async handleCreateWorkOrder (e) {
    const { id: pid } = e.mark!
    const { sid } = this
    if (sid === 1 || sid === 2 || sid === 3) {
      const res = await getKfLink(pid, sid)
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
    } else if (sid === 4 || sid === 5) {
      wx.navigateTo({
        url: `/pages/workorder/workorder?sid=${sid}&pid=${pid}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/software/software?sid=${sid}&pid=${pid}`,
      })
    }
  },

})
