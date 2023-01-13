import Toast from '@vant/weapp/toast/toast'
import { getAllProductTypes, getProductModelByTypeId } from '@/apis/product'

Page<{
  productTypes: ProductType[]
  currentType: number
  productModels: ProductModel[]
}, {
  loadProductTypes: () => Promise<void>
  loadProductModels: (current?: number) => Promise<void>
  handleSwitch: (e: WechatMiniprogram.CustomEvent<{ current: number }>) => void
}>({

  data: {
    productTypes: [],
    currentType: -1,
    productModels: [],
  },

  onLoad () {
    this.loadProductTypes()
  },

  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 1,
        })
      }
  },

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

  handleSwitch(e) {
    const { current } = e.detail
    this.loadProductModels(current)
    this.setData({
      currentType: current,
    })
  },

})
