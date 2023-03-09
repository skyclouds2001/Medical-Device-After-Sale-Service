# MedicalDeviceAfterSaleService

## 项目初始化

* 预先下载 node，node 建议版本 `18.13.0`，npm 建议版本 `9.3.1`
* 项目根目录打开终端执行 `npm install`
* 工具-构建npm

## 项目结构

- apis/ 接口目录
  - admin.ts 管理接口方法
  - company.ts 公司接口方法
  - consult.ts 客服接口方法
  - product.ts 产品接口方法
  - work-order.ts 工单接口方法
- components/ 自定义组件目录
  - product-sidebar 产品大类选择器
  - search-bar 搜索框
  - userinfo-dialog 填写用户头像昵称弹窗
  - welcome-bg 欢迎背景
- config/ 自定义配置目录
  - index.ts
- custom-tab-bar/ 自定义tabbar组件目录
- data/ 静态数据目录
  - index.ts
- icons/ 静态图标目录
- images/ 静态图片资源目录
- lib/ 工具方法目录（微信原生方法包装工具方法）
  - request.ts 包装请求方法
  - storage.ts 兼容批量存储方法
- models/ 数据模型定义目录
  - Accessory.d.ts 工单附件数据结构
  - App.d.ts 根App数据结构
  - Company.d.ts 公司数据结构
  - ProductModel.d.ts 产品类型数据结构
  - ProductType.d.ts 产品大类数据结构
  - Response.d.ts 请求响应数据结构
  - UserInfo.d.ts 用户信息数据结构
  - WorkOrder.d.ts 工单数据结构
- pages/ 页面目录
  - register 注册页
  - home 首页
  - product-list 创建工单-选取产品页
  - workorder 创建工单-填写工单信息页
  - submited 创建工单-提交工单页
  - mine 个人中心页
  - history 历史工单列表页
  - workorderdetail 工单详情页
- utils/ 工具方法目录（其他工具方法）
  - date.ts 日期转换方法文件
  - validate.ts 手机号密码等校验方法文件
- app.ts
- app.json
- app.scss
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

- 注册 | page/register/index
- 首页&服务大厅 | pages/home/index
- 选择产品 | pages/fix/index
- 创建工单 | pages/workorder/index
- 提交工单成功反馈 | pages/submited/index
- 个人中心 | pages/mine/index
- 历史工单列表 | pages/history/index
- 工单详情 | pages/workorderdetail/index

## 开发文档

[产品文档](https://wizzstudio.feishu.cn/docx/doxcn3OPMHR2E2UbeU8PWE0EjFh)
[概念图](https://modao.cc/app/uojxAUBurl46enoCEJNZy)
[原型图](https://www.figma.com/file/AexzIo733ORZWnnNYJNRVo/%E5%AE%A2%E6%9C%8D%E5%B7%A5%E5%8D%95%E7%B3%BB%E7%BB%9F)
[接口文档说明](https://wizzstudio.feishu.cn/docx/QYondktQKoDH2vx6n0BcEedCnVh)
[账号管理&客户咨询模块接口文档(aftersale1119)](https://www.eolink.com/share/index?shareCode=qvPkxP)
[产品管理模块接口文档(wizz)](https://www.eolink.com/share/index?shareCode=FugySB)
[工单模块接口文档(wizz)](https://www.eolink.com/share/index?shareCode=Ynzy7T)
