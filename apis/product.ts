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

type GetProductModelByModelIdResponse = ProductModel

export const getProductModelByModelId = (id: number) => {
  return request<GetProductModelByModelIdResponse>({
    url: '/wizz/aftersale/product-model/get',
    method: 'GET',
    data: {
      productModelId: id,
    },
  })
}
