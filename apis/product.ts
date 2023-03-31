import { request } from '@/lib/request'
import type ProductModel from '@/models/ProductModel'

type GetAllProductModelsResponse = ProductModel[]

/**
 * 获取全部产品大类方法
 */
export const getAllProductModels = () => {
  return request<GetAllProductModelsResponse>({
    url: '/wizz/aftersale/product-model/all',
    method: 'GET',
  })
}

type GetProductModelByTypeIdResponse = ProductModel[]

/**
 * 根据产品大类获取产品模型方法
 *
 * @param id 产品大类ID
 */
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

/**
 * 根据产品模型ID获取产品模型方法
 *
 * @param id 产品模型ID
 */
export const getProductModelByModelId = (id: number) => {
  return request<GetProductModelByModelIdResponse>({
    url: '/wizz/aftersale/product-model/get',
    method: 'GET',
    data: {
      productModelId: id,
    },
  })
}
