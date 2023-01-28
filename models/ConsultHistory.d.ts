/**
 * 历史咨询数据结构
 */
interface ConsultHistory {
  /** 咨询时间。格式：yyyy年MM月dd日HH:mm:ss */
  consult_time: string
  /** 咨询历史id */
  history_id: number
  /** 咨询对应的客服链接 */
  kf_link: string
  /** 咨询主体（产品大类-产品型号） */
  topic: string
}
