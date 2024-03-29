import { request } from '@/lib/request'
import type Accessory from '@/models/Accessory'
import type WorkOrder from '@/models/WorkOrder'

type PostWorkOrderResponse = {}

/**
 * 提交工单方法
 *
 * @param address 地址
 * @param time 预定时间
 * @param cid 客户ID
 * @param mid 产品模型ID
 * @param accessories 工单附件
 * @param type 工单类型
 * @param addition 工单补充信息
 */
export const postWorkOrder = (address: string, time: string, cid: number, mid: number, accessories: Array<Omit<Accessory, 'order_id' | 'order_attachment_id'>>, type: number, addition: string) => {
  return request<PostWorkOrderResponse>({
    url: '/wizz/aftersale/work-order/add',
    method: 'POST',
    data: {
      address: address,
      appointment_time: time,
      customer_id: cid,
      model_id: mid,
      order_attachment_list: accessories,
      order_type: type,
      kefu_type: type + 1,
      order_description: addition,
    },
    header: {
      'content-type': 'application/json',
    },
  })
}

type GetUserWorkOrderResponse = WorkOrder[]

/**
 * 根据用户ID获取工单方法
 *
 * @param id 用户ID
 */
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

/**
 * 根据工单ID获取工单方法
 *
 * @param id 工单ID
 */
export const getWorkOrderById = (id: number) => {
  return request<GetWorkOrderByIdResponse>({
    url: '/wizz/aftersale/work-order/get',
    method: 'GET',
    data: {
      workOrderId: id,
    },
  })
}
