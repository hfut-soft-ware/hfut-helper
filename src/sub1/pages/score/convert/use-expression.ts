import { ref, shallowRef, watch } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import Dialog from '@vant/weapp/dist/dialog/dialog'
import { getRandomQAQ } from 'qaq-font'
import Fuse from 'fuse.js'
import { useDebounceFn } from '@vueuse/core'
import { confirmGrammer, getStatements, getTokenTips, grammerCheck } from '@/server/api/score'

import type { Course } from '@/shared/types/response/token-tips'

const courseReg = /[\p{L}\w]+(（.+）)*(\(.+\))*/gu
const fuseOptions: Fuse.IFuseOptions<Course> = {
  keys: ['name'],
}

export function useExpression() {
  const expression = ref('')
  const tipList = shallowRef<Fuse.FuseResult<Course>[]>([])
  const tipShow = ref(false)
  const statements = ref<string[]>([])
  const grammerCheckMsg = ref('')

  let trainPlansFuse: Fuse<Course> | null = null
  let mineFuse: Fuse<Course> | null = null
  let prevMatchRes: RegExpMatchArray[] | null = null
  let tipClick = false
  let matchChangeIndex = 0

  watch(expression, (newVal: string) => {
    if (!trainPlansFuse || !mineFuse) {
      return
    }
    // 当点击提示按钮时，不进行提示
    if (tipClick) {
      tipClick = false
      return
    }
    const matchRes = Array.from(newVal.matchAll(courseReg))
    // console.log(matchRes)
    if (!matchRes) {
      return
    }
    // 匹配减少一项
    if (prevMatchRes && prevMatchRes.length > matchRes.length) {
      return
    }
    // 符号过滤
    if (prevMatchRes && isRegMatchEqual(prevMatchRes, matchRes)) {
      return
    }
    // 粘贴过滤
    if (!prevMatchRes && matchRes.length > 1) {
      return
    }

    if (matchRes.length === 1) {
      tipList.value = trainPlansFuse.search(matchRes[0][0]).splice(0, 5)
    } else {
      if (!prevMatchRes) {
        return
      }
      const index = getCompareIndex(prevMatchRes, matchRes)
      matchChangeIndex = index
      tipList.value = mineFuse.search(matchRes[index][0]).splice(0, 5)
    }
    tipShow.value = true
    prevMatchRes = matchRes
  })

  getTokenTips().then(({ data }) => {
    trainPlansFuse = new Fuse(data.data.trainPlans, fuseOptions)
    mineFuse = new Fuse(data.data.mine, fuseOptions)
  }).catch((error) => {
    Toast.fail(`糟糕，没有拿到课程信息\n ${getRandomQAQ('sadness')[0]}\n${error.message}`)
  })

  getStatements().then(({ data }) => {
    statements.value = data.data.statements
  }).catch((error) => {
    Toast.fail(`糟糕，没有拿到表达式信息\n ${getRandomQAQ('sadness')[0]}\n${error.message}`)
  })

  const handleTipClick = (courseName: string) => {
    tipClick = true
    tipShow.value = false
    expression.value = strReplace(expression.value, prevMatchRes![matchChangeIndex], courseName)
  }

  const handleSymbolClick = (symbol: string) => {
    expression.value += symbol
  }

  const inputClear = () => {
    prevMatchRes = null
    matchChangeIndex = 0
    tipShow.value = false
    grammerCheckMsg.value = ''
  }

  const handleCheck = useDebounceFn(async() => {
    const expressionVal = expression.value
    try {
      const { data } = await grammerCheck({
        statements: [expressionVal],
      })
      const res = data.data
      grammerCheckMsg.value = res
      if (res === '语法校验成功!') {
        Toast.success(res)
        statements.value.unshift(expressionVal)
        inputClear()
      } else {
        Toast.fail(`语法校验失败\n ${getRandomQAQ('sadness')[0]}`)
      }
    } catch (error: any) {
      Toast.fail(`语法校验出错\n ${getRandomQAQ('sadness')[0]}\n${error.message}`)
    }
  }, 1000)

  const handleConfirm = useDebounceFn(() => {
    confirmGrammer({
      statements: statements.value,
    }).then(({ data }) => {
      const msg = data.msg
      if (msg === '成功') {
        Toast.success(`提交成功\n ${getRandomQAQ('happy')[0]}`)
      } else {
        Toast.fail(`${msg}\n ${getRandomQAQ('sadness')[0]}`)
      }
    }).catch((error) => {
      Toast.fail(`提交出错\n ${getRandomQAQ('sadness')[0]}\n${error.message}`)
    })
  }, 1000)

  const deleteStatement = (index: number) => {
    return statements.value.splice(index, 1)
  }

  const editStatement = (index: number) => {
    if (expression.value) {
      Dialog.confirm({
        title: '提示',
        message: '输入框中有内容，是否替换',
      })
        .then(() => {
          inputClear()
          expression.value = deleteStatement(index)[0]
        })
        .catch(() => {
        })
    } else {
      inputClear()
      expression.value = deleteStatement(index)[0]
    }
  }

  return {
    expression,
    tipList,
    tipShow,
    tipClick,
    statements,
    grammerCheckMsg,
    handleTipClick,
    handleSymbolClick,
    inputClear,
    handleCheck,
    handleConfirm,
    deleteStatement,
    editStatement,
  }
}

function getCompareIndex(prev: RegExpMatchArray[], current: RegExpMatchArray[]): number {
  let res = 0
  current.forEach((value, index) => {
    if (!prev[index]) {
      res = index
      return
    }
    if (value[0] !== prev[index][0]) {
      res = index
    }
  })
  return res
}

function isRegMatchEqual(prev: RegExpMatchArray[], current: RegExpMatchArray[]) {
  return current.every((value, index) => {
    if (!prev[index]) {
      return false
    }
    return value[0] === prev[index][0]
  })
}

function strReplace(str: string, searchVal: RegExpMatchArray, replaceVal: string) {
  // console.log(str, searchVal, replaceVal)
  let index = searchVal.index!
  if (index > 0 && str[index - 1] === '`') {
    index--
  }
  const left = str.slice(0, index)
  const right = str.slice(index + searchVal[0].length)
  return `${left}\`${replaceVal}\`${right}`
}
