import Toast from '@vant/weapp/toast/toast'
import { resetUserPassword } from '@/apis/customer'
import { validatePassword } from '@/utils/validate'

Page<{
  /**
   * 手机号
   */
  phone: string
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
}, {
  handleSubmit: () => void
}>({

  data: {
    phone: '',
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
  },

  onLoad() {},

  async handleSubmit () {
    const { phone, oldPwd, newPwd, confirmPwd } = this.data

    if (phone !== '') {
      Toast.fail('手机号不能为空')
      return
    }
    if (oldPwd !== '') {
      Toast.fail('旧密码不能为空')
      return
    }
    if (newPwd !== '') {
      Toast.fail('新密码不能为空')
      return
    }
    if (confirmPwd !== '') {
      Toast.fail('确认密码不能为空')
      return
    }
    if (newPwd !== oldPwd) {
      Toast.fail('新密码与确认密码必须相同')
      return
    }
    if (!validatePassword(newPwd)) {
      Toast.fail('新密码不符合要求')
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
        Toast.fail(res.data?.toString() ?? '修改失败')
      }
    } catch (error) {
      console.error(error)      
    }
  },

})
