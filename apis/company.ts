import { request } from '@/lib/request'

interface GetCompanyListResponse {
  company_list: Company[]
  total_num: number
}

export const getCompanyList = (pageNum: number, isFirstQuery: boolean) => {
  return request<GetCompanyListResponse>({
    url: `/wizz/aftersale/account/company/query/${isFirstQuery}/${pageNum}`,
  })
}
