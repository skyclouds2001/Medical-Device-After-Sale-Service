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
