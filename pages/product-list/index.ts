import Toast from '@vant/weapp/toast/toast'
import { getAllProductTypes, getProductModelByTypeId } from '@/apis/product'
import type ProductType from '@/models/ProductType'
import type ProductModel from '@/models/ProductModel'

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
  sid: -1 | 1 | 2 | 3 | 4

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
    const sid = parseInt(options.sid)

    if (sid !== 1 && sid !== 2 && sid !== 3 && sid !== 4) {
      Toast.fail('非法的服务类型')

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

      return
    }

    this.sid = sid

    this.loadProductTypes()
  },

  sid: -1,

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

    wx.navigateTo({
      url: `/pages/create-workorder/index?sid=${sid}&pid=${pid}`,
    })
  },

})
