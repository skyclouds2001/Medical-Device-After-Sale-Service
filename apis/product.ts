import { request } from '@/lib/request'

type GetAllProductTypesResponse = ProductType[]

export const getAllProductTypes = () => {
  return request<GetAllProductTypesResponse>({
    url: '/wizz/aftersale/product-type/all',
    method: 'GET',
  })
}

type GetProductModelByTypeIdResponse = ProductModel[]

export const getProductModelByTypeId = (id: number) => {
  return request<GetProductModelByTypeIdResponse>({
    url: '/wizz/aftersale/product-model/getByTypeId',
    method: 'GET',
    data: {
      productTypeId: id,
    },
  })
}
