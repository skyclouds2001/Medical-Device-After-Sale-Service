import Toast from '@vant/weapp/toast/toast'
import { resetUserPassword } from '@/apis/customer'

Page<{
  /**
   * 旧密码
   */
  oldPwd: string
  /**
   * 新密码
   */
  newPwd: string
  /**
   * 确认密码
   */
  confirmPwd: string

  /**
   * 旧密码输入框是否使用密码
   */
  oldVisiable: boolean
  /**
   * 新密码输入框是否使用密码
   */
  newVisiable: boolean
  /**
   * 确认密码输入框是否使用密码
   */
  confirmVisiable: boolean
}, {
  /**
   * 切换密码输入框可见性方法
   *
   * @param e 触摸事件
   */
  handleTogglePasswordFieldVisibility: (e: WechatMiniprogram.CustomEvent<{}, { type: 'old' | 'new' | 'confirm' }>) => void
  /**
   * 提交表单方法
   */
  handleSubmit: () => void
}>({

  data: {
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
    oldVisiable: false,
    newVisiable: false,
    confirmVisiable: false,
  },

  onLoad () {},

  handleTogglePasswordFieldVisibility (e) {
    const { type } = e.mark!
    const { oldVisiable, newVisiable, confirmVisiable } = this.data
    switch (type) {
      case 'old':
        this.setData({
          oldVisiable: !oldVisiable,
        })
        break
      case 'new':
        this.setData({
          newVisiable: !newVisiable,
        })
        break
      case 'confirm':
        this.setData({
          confirmVisiable: !confirmVisiable,
        })
        break
    }
  },

  async handleSubmit () {
    const { oldPwd, newPwd, confirmPwd } = this.data

    if (oldPwd === '') {
      Toast.fail('旧密码不能为空')
      return
    }
    if (newPwd === '') {
      Toast.fail('新密码不能为空')
      return
    }
    if (confirmPwd === '') {
      Toast.fail('确认密码不能为空')
      return
    }
    if (newPwd === oldPwd) {
      Toast.fail('新密码与确认密码必须相同')
      return
    }

    try {
      const res = await resetUserPassword(oldPwd, newPwd)
      if (res.code === 0) {
        Toast.fail('修改成功')

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/mine/index',
          })
        }, 1500)
      } else {
        Toast.fail(res.msg ?? '修改失败')
      }
    } catch (error) {
      console.error(error)      
    }
  },

})
