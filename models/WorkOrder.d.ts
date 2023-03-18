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
  /** 产品型号id */
  model_id: number
  /** 产品型号名称 */
  model_name: string
  /** 附件列表 */
  order_attachment_list: Accessory[]
  /** 创建时间 */
  create_time: string
}
