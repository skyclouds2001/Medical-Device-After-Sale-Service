/**
 * 工单数据模型
 */
interface WorkOrder {
  /** 工单id */
  order_id: number
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
}
