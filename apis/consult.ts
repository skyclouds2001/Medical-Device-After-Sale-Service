import { request } from '@/lib/request'

interface GetHistoriesResponse {
  history_list: ConsultHistory[]
  total_page_num: number
}

/**
 * 获取咨询历史（分页）方法
 *
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
 */
export const getKfLink = (productModelId: number) => {
  return request<GetKfLinkResponse>({
    url: `/wizz/aftersale/consult/getKfLink/${productModelId}`,
    method: 'GET',
  })
}
