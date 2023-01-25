import { request } from '@/lib/request'

type PostWorkOrderResponse = {}

export const postWorkOrder = (address: string, time: string, cid: number, mid: number, accessories: Accessory[]) => {
  return request<PostWorkOrderResponse>({
    url: '/wizz/aftersale/work-order/add',
    method: 'POST',
    data: {
      address: address,
      appointment_time: time,
      customer_id: cid,
      model_id: mid,
      order_attachment_list: accessories,
    },
    header: {
      'content-type': 'application/json',
    },
  })
}

type GetUserWorkOrderResponse = WorkOrder[]

export const getUserWorkOrder = (id: number) => {
  return request<GetUserWorkOrderResponse>({
    url: '/wizz/aftersale/work-order/all',
    method: 'GET',
    data: {
      customerId: id,
    },
  })
}

type GetWorkOrderByIdResponse = WorkOrder

export const getWorkOrderById = (id: number) => {
  return request<GetWorkOrderByIdResponse>({
    url: '/wizz/aftersale/work-order/get',
    method: 'GET',
    data: {
      workOrderId: id,
    },
  })
}
