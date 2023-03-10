/**
 * 首页展示的服务类型数据结构
 */
export interface Service {
  id: number
  img: string
  text: string
  bg: string
}

/**
 * 首页展示的基础服务类型
 */
export const basicServices: Service[] = [
  {
    id: 1,
    img: '/icons/service/install.svg',
    text: '安调',
    bg: '#62CE46',
  },
  {
    id: 2,
    img: '/icons/service/fix.svg',
    text: '维修',
    bg: '#40D39E',
  },
  {
    id: 3,
    img: '/icons/service/screen.svg',
    text: '询检',
    bg: '#5C7CEB',
  },
  {
    id: 4,
    img: '/icons/service/auth.svg',
    text: '认证',
    bg: '#62CE46',
  },
  {
    id: 5,
    img: '/icons/service/train.svg',
    text: '培训',
    bg: '#40D39E',
  },
  {
    id: 6,
    img: '/icons/service/update.svg',
    text: '软件升级',
    bg: '#5C7CEB',
  },
]

/**
 * 首页展示的其他服务类型
 */
export const otherServices: Service[] = [
  {
    id: 1,
    img: '/icons/service/setting.svg',
    text: '配件采购',
    bg: '#40D39E',
  },
]

/**
 * Tabbar数据结构
 */
export interface Tab {
  id: number
  name: string
  path: string
  icon: string
  icon_active: string
}

/**
 * Tabbars数据
 */
export const tabs: Tab[] = [
  {
    id: 1,
    name: '首页',
    path: '/pages/home/index',
    icon: '/icons/home_fill.png',
    icon_active: '/icons/home_fill_selected.png',
  },
  {
    id: 2,
    name: '个人中心',
    path: '/pages/mine/index',
    icon: '/icons/wode_fill.png',
    icon_active: '/icons/wode_fill_selected.png',
  },
]

/**
 * 产品状态数据结构
 */
export interface Status {
  id: number
  name: string
}

/**
 * 产品状态数据
 */
export const statuses: Status[] = [
  {
    id: 0,
    name: '全部',
  },
  {
    id: 1,
    name: '未受理',
  },
  {
    id: 2,
    name: '处理中',
  },
  {
    id: 3,
    name: '有回复',
  },
  {
    id: 4,
    name: '已解决',
  },
  {
    id: 5,
    name: '已完成',
  },
  {
    id: 6,
    name: '已评价',
  },
]
