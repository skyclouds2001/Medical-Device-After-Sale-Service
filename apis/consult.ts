import { request } from '@/lib/request'

interface GetHistoriesResponse {
  history_list: ConsultHistory[]
  total_page_num: boolean
}

export const getHistories = (isFirstQuery: boolean, pageNum: number) => {
  return request<GetHistoriesResponse>({
    url: `/wizz/aftersale/consult/getHistories/${isFirstQuery}/${pageNum}`,
    method: 'GET',
  })
}

interface GetKfLinkResponse {
  kf_link: string
}

export const getKfLink = (productModelId: number) => {
  return request<GetKfLinkResponse>({
    url: `/wizz/aftersale/consult/getKfLink/${productModelId}`,
    method: 'GET',
  })
}
