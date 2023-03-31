import type Accessory from '@/models/Accessory'

/**
 * 工单数据模型
 */
interface WorkOrder {
  /** 工单id */
  order_id: number
  /** 工单类型 */
  order_type: 0 | 1 | 2 | 3 | 4 | 5
  /** 工单状态  0 未处理 | 1 已处理 */
  order_status: 0 | 1
  /** 地址 */
  address: string
  /** 上门预约时间 */
  appointment_time: string
  /** 客户id */
  customer_id: number
  /** 企业名称 */
  customer_company: string
  /** 客户名称 */
  customer_name: string
  /** 产品型号id */
  model_id: number
  /** 产品型号名称 */
  model_name: string
  /** 问题描述 */
  order_description: string
  /** 附件列表 */
  order_attachment_list: Accessory[]
  /** 创建时间 */
  create_time: string
  /** 接待人员名称 */
  servicer_name: string
}

export default WorkOrder
