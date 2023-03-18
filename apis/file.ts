import { request } from '@/lib/request'

interface GetFileListResponse {
  file_info_list: File[]
}

/**
 * 获取文件列表方法
 *
 * @param type 服务类型
 */
export const getFileList = (type: 0 | 1) => {
  return request<GetFileListResponse>({
    url: '/wizz/aftersale/file/list',
    method: 'GET',
    data: {
      fileType: type,
    },
  })
}
