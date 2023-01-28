import { request } from '@/lib/request'

interface GetCompanyListResponse {
  company_list: Company[]
  total_num: number
}

/**
 * 获取公司列表（分页）方法
 *
 * @param pageNum 页码
 * @param isFirstQuery 是否首次查询
 */
export const getCompanyList = (pageNum: number, isFirstQuery: boolean) => {
  return request<GetCompanyListResponse>({
    url: `/wizz/aftersale/account/company/query/${isFirstQuery}/${pageNum}`,
    method: 'GET',
  })
}
