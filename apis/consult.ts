import { request } from '@/lib/request'
import type ConsultHistory from '@/models/ConsultHistory'

/**
 * @deprecated
 */
interface GetHistoriesResponse {
  history_list: ConsultHistory[]
  total_page_num: number
}

/**
 * 获取咨询历史（分页）方法
 *
 * @deprecated
 * @param isFirstQuery 是否首次查询
 * @param pageNum 页码
 */
export const getHistories = (isFirstQuery: boolean, pageNum: number) => {
  return request<GetHistoriesResponse>({
    url: `/wizz/aftersale/consult/getHistories/${isFirstQuery}/${pageNum}`,
    method: 'GET',
  })
}

interface GetKfLinkResponse {
  kf_link: string
}

/**
 * 获取客服链接方法
 *
 * @param productModelId 产品模型ID
 * @param kefuTypeCode 客服类型
 * @param workOrderId 工单ID
 */
export const getKfLink = (productModelId: number, kefuTypeCode: -1 | 1 | 2 | 3 | 4 | 5 | 6, workOrderId: number) => {
  return request<GetKfLinkResponse>({
    url: `/wizz/aftersale/consult/getKfLink/${productModelId}/${kefuTypeCode}/${workOrderId}`,
    method: 'GET',
  })
}
