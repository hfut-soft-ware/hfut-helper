import { defineStore } from 'pinia'
import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import type { ICourse } from '@/shared/types/response/course'
import type { LoginDto } from '@/store/auth.store'
import { getUserAccount, useAuthStore } from '@/store/auth.store'
import { useCourseListStore } from '@/store/courseList.store'
import { isObject } from '@/shared/utils'

export const LOVER_TOKEN = '__LOVER_TOKEN__'
export const LOVER_COURSE = '__LOVER_COURSE__'
export const LOVER_STATUS = '__LOVER_STATUS__'

export const setLoverToken = (token: string) => uni.setStorageSync(LOVER_TOKEN, token)
export const getLoverToken = () => uni.getStorageSync(LOVER_TOKEN) as string | undefined

export const setLoverCourse = (course: ICourse) => uni.setStorageSync(LOVER_COURSE, course)
export const getLoverCourse = () => uni.getStorageSync(LOVER_COURSE) as ICourse

export const setLoverStatus = (isLover: boolean) => uni.setStorageSync(LOVER_STATUS, isLover)
export const getLoverStatus = () => !!uni.getStorageSync(LOVER_STATUS)

let isInit = false

export const uesLoverStore = defineStore('loverStore', () => {
  const isLover = ref(isInit ? getLoverStatus() : false)
  isInit = true

  const isLoverRelieved = ref(!isObject(getLoverCourse()))

  const authStore = useAuthStore()
  const courseStore = useCourseListStore()

  const setLover = (status: boolean, needToUpdateCourse = false) => {
    isLover.value = status
    if (needToUpdateCourse) {
      courseStore.changeStatus(status)
    }
  }

  const loverLogin = async(loginDto: LoginDto) => {
    if (getUserAccount().studentId === loginDto.studentId) {
      Toast.fail('人类还没进化到自己和自己谈恋爱的程度啊\n(○´･д･)ﾉ')
      return
    }
    const loverCb = async(token: string) => {
      setLoverToken(token)
      setLover(true, false)
      await courseStore.getCourseList(true).then(() => {
        setLoverStatus(true)
        isLoverRelieved.value = false
      }).catch(() => {
        setLoverStatus(false)
        setLover(false)
      })
    }

    await authStore.login({ ...loginDto, callback: loverCb })
  }

  const loverLogout = async() => {
    uni.removeStorageSync(LOVER_TOKEN)
    uni.removeStorageSync(LOVER_COURSE)
    uni.removeStorageSync(LOVER_STATUS)
    setLover(false, true)
    isLoverRelieved.value = true
  }

  return {
    isLover,
    isLoverRelieved,
    setLover,
    loverLogout,
    loverLogin,
  }
})
