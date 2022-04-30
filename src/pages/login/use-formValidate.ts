import { reactive } from 'vue'
import * as _ from 'lodash'
import Notify from '@vant/weapp/lib/notify/notify'

export function useFormValidate() {
  const form = reactive({
    username: '',
    password: '',
  })

  // 考虑到小程序功能没有多少表单验证，所以没必要装插件，直接手撸吧
  function validate() {
    const username = form.username

    const validateUsername = () => {
      if (_.isNaN(_.toNumber(username))) {
        return
      }
      if (username.length !== 10) {
        return
      }
      if (!username.startsWith('20')) {
        return
      }

      return true
    }

    const validatePwd = () => {
      const pwd = form.password
      if (pwd.length < 13) {
        return
      }
      return true
    }

    const isValidate = {
      username: validateUsername(),
      pwd: validatePwd(),
    }
    if (!isValidate.username) {
      Notify({ type: 'danger', message: '学号格式错误' })
      return
    }

    if (!isValidate.pwd) {
      Notify({ type: 'danger', message: '密码格式错误，信息门户的密码至少是13位字符' })
      return
    }

    return true
  }

  return {
    validate,
    form,
  }
}
