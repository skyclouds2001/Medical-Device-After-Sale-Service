/**
 * 工单附件数据模型
 */
interface Accessory {
  /** 图片的云端存储路径 */
  storage_path: string
  /** 图片序号（与在解决方案界面展示的顺序有关）,从0开始 */
  serial_number: number
  /** 工单id */
  order_id: number
  /** 工单附件id */
  order_attachment_id: number
}

export default Accessory
