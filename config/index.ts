/** 应用名称 */
export const APPLICATION_NAME: string = 'MedicalDeviceAfterSaleService'

/** 应用版本 */
export const APPLICATION_VERSION: string = '0.0.0'

/** 网络请求HOST */
export const SERVER_HOST: string = 'http://aftersale.divergentcloud.com'

/** 默认请求无需鉴权接口白名单，若修改需同时修改后端 */
export const WHITE_LIST: string[] = ['/wizz/aftersale/account/customer/login', '/wizz/aftersale/account/customer/authenticate']

/** 默认单页的容量，若修改需同时修改后端 */
export const DEFAULT_PAGE_SIZE: number = 10

/** 默认登录Session过期时间，若修改需同时修改后端 */
export const SESSION_EXPIRE: number = 3 * 24 * 60 * 60 * 1000

/** 调用微信客服接口企业ID */
export const CUSTOMER_SERVICE_COMPANY_ID: string = 'ww562acecf4b6b8caf'
