# MedicalDeviceAfterSaleService

## 项目初始化

* 预先下载 node，node 建议版本 `18.x.x`，npm 建议版本 `9.x.x`
* 项目根目录打开终端执行 `npm install`
* 菜单栏-工具-构建npm

## 项目技术栈

Sass（Less）+TypeScript

## 项目结构

- apis/ 接口目录
  - admin.ts 管理接口方法
  - consult.ts 客服接口方法
  - customer.ts 客户接口方法
  - file.ts 文件接口方法
  - product.ts 产品接口方法
  - work-order.ts 工单接口方法
- components/ 自定义组件目录
  - welcome-bg 欢迎背景组件
  - workorder-search 工单搜索组件
- config/ 自定义配置目录
  - index.ts
- custom-tab-bar/ 自定义tabbar组件目录
- data/ 静态数据目录（首页菜单、工单状态等）
  - index.ts
- icons/ 静态图标资源目录
- images/ 静态图片资源目录
- lib/ 工具方法目录【微信原生方法包装工具方法】
  - file.ts 包装文件上传下载方法
  - request.ts 包装请求方法
  - storage.ts 兼容批量存储方法
- models/ 数据模型定义目录
  - Accessory.ts 工单附件数据结构
  - App.ts 根App数据结构
  - Company.ts 公司数据结构
  - ConsultHistory.ts 历史咨询数据结构（已废弃）
  - ProductModel.ts 产品类型数据结构
  - ProductType.ts 产品大类数据结构
  - Response.ts 请求响应数据结构
  - UserInfo.ts 用户信息数据结构
  - WorkOrder.ts 工单数据结构
- pages/ 页面目录
  - created-workorder 创建工单页
  - document-list 文件列表页
  - home 首页
  - login 登录页
  - mine 个人中心页
  - reset-password 重设密码页
  - submited-workorder 成功提交工单反馈页
  - workorder-detail 历史工单详情页
  - workorder-history 历史工单列表页
- utils/ 工具方法目录（其他工具方法）
  - date.ts 日期转换方法文件
  - validate.ts 校验方法文件（手机号）
- app.ts
- app.scss
- app.json
- project.config.json
- sitemap.json
- package.json
- package-lock.json
- tsconfig.json
- .gitattributes
- .gitignore
- LICENSE
- README.md

## 页面路由

- 登录 | page/login/index
- 首页&服务大厅 | pages/home/index
- 创建工单 | pages/create-workorder/index
- 提交工单成功反馈 | pages/submited-workorder/index
- 历史文件列表 | pages/document-list/index
- 历史工单列表 | pages/workorder-history/index
- 工单详情 | pages/workorder-detail/index
- 个人中心 | pages/mine/index
- 重置密码 | pages/reset-password/index

## 开发文档

[产品文档](https://wizzstudio.feishu.cn/docx/doxcn3OPMHR2E2UbeU8PWE0EjFh)
[概念图](https://modao.cc/app/uojxAUBurl46enoCEJNZy)
[原型图](https://www.figma.com/file/AexzIo733ORZWnnNYJNRVo/%E5%AE%A2%E6%9C%8D%E5%B7%A5%E5%8D%95%E7%B3%BB%E7%BB%9F)
[接口文档说明](https://wizzstudio.feishu.cn/docx/QYondktQKoDH2vx6n0BcEedCnVh)
[新模块接口文档](https://www.apifox.cn/apidoc/shared-b274c37a-1f50-414f-97d8-b5ec3975541c?pwd=aftersale1111)
