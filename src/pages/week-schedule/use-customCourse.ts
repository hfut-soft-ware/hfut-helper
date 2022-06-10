import Toast from '@vant/weapp/lib/toast/toast'
import { computed, reactive, ref } from 'vue'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import type { CourseData, useCourseListStore } from '@/store/courseList.store'
import type { IAddCourseDto } from '@/shared/types/dto/course'
import { addCourseRequest, deleteCourseRequest, updateCourseRequest } from '@/server/api/user'
import type { TColors } from '@/shared/constant'
import { CARD_COLORS } from '@/shared/constant'
import { LESSON_INDEX_TO_TIME } from '@/pages/week-schedule/constant'
import type { CreateCustomPageEmits } from '@/components/CreateCustomPage/CreateCustomPage.vue'

export type CustomType = 'add' | 'update'

export type Options = {
  name: string
  desc: string
  location: string
  startIndex: number
  currentWeek: number
  currentDay?: number
  type: CustomType
  id?: string
  course: CourseData
}

export function useCustomCourse(
  store: ReturnType<typeof useCourseListStore>,
  options: Options,
  emit: CreateCustomPageEmits,
) {
  const courseName = ref(options.name)
  const courseDesc = ref(options.desc)
  const courseLocation = ref(options.location)
  const courseStep = ref(1)
  const courseActive = reactive([options.currentWeek])

  const startIdx = ref(options.startIndex - 1)
  const period = options.course?.course?.period || 0
  const endIdx = computed(() => startIdx.value + courseStep.value + (period > 0 ? period - 1 : period))

  const colorActive = ref<TColors>(CARD_COLORS[0] as TColors)

  const requestDto = computed<IAddCourseDto>(() => ({
    name: courseName.value,
    mark: courseDesc.value,
    color: colorActive.value,
    schedule: {
      startTime: (LESSON_INDEX_TO_TIME as any)[startIdx.value + 1].startTime,
      endTime: (LESSON_INDEX_TO_TIME as any)[endIdx.value].endTime,
      room: courseLocation.value,
      weekDay: options?.currentDay,
      weeks: courseActive,
    },
  }))

  function onCourseStepChange(step: any) {
    const val = step.detail as number

    if (startIdx.value + 1 + val > 11) {
      Toast('最大只能为11节哦')
      return
    }

    courseStep.value = val
  }

  function handleWeekActiveClick(weekIdx: number) {
    if (courseActive.includes(weekIdx)) {
      const idx = courseActive.findIndex(item => item === weekIdx)
      courseActive.splice(idx, 1)
      return
    }
    courseActive.push(weekIdx)
  }

  const addCourse = async(data: IAddCourseDto) => {
    await addCourseRequest(data).then((res) => {
      Toast.loading({
        duration: 0,
        message: '添加成功，重新刷新课表中...',
      })
      store.getCourseList(true).then((res) => {
        Toast.success({
          message: '添加成功',
        })
      }).catch(() => {
        Toast.fail({
          message: '课表加载失败',
        })
      })
    }).catch(() => {
      Toast.fail({
        message: '课表添加失败',
      })
    })
  }

  const updateCourse = async(data: IAddCourseDto) => {
    await updateCourseRequest(data).then((res) => {
      Toast.loading({
        duration: 0,
        message: '更新成功，重新刷新课表中...',
      })
      store.getCourseList(true).then((res) => {
        Toast.success({
          message: '课表加载成功',
        })
      }).catch(() => {
        Toast.fail({
          message: '课表加载失败',
        })
      })
    }).catch(() => {
      Toast.fail({
        message: '日程更新失败',
      })
    })
  }

  const handleUpdateCourse = () => {
    Dialog.confirm({
      title: '确定要更新日程吗？',
      zIndex: 99999999,
      beforeClose: action => new Promise((resolve) => {
        if (action === 'confirm') {
          updateCourse({
            id: options.id,
            ...requestDto.value,
          }).then(() => {
            emit('updated')
            resolve(true)
          })
        } else {
          resolve(true)
        }
      }),
    })
  }

  const deleteCourse = async(diyId: string) => {
    await deleteCourseRequest(diyId).then((res) => {
      store.getCourseList(true).then((res) => {
        Toast.success({
          message: '课表加载成功',
        })
      }).catch(() => {
        Toast.fail({
          message: '课表加载失败',
        })
      })
    }).catch(() => {
      Toast.fail({
        message: '日程删除失败',
      })
    })
  }

  const handleDeleteCourse = () => {
    Dialog.confirm({
      title: '确定要删除日程吗？',
      zIndex: 9999999,
      beforeClose: action => new Promise((resolve) => {
        if (action === 'confirm') {
          deleteCourse(options.id!).then(() => {
            emit('updated')
            resolve(true)
          })
        } else {
          resolve(true)
        }
      }),
    })
  }

  const handleAddCourseClick = (data: IAddCourseDto) => {
    Dialog.confirm({
      title: '确定要新增日程吗？',
      zIndex: 99999999,
      beforeClose: action => new Promise((resolve) => {
        if (action === 'confirm') {
          addCourse(data).then(() => {
            emit('updated')
            resolve(true)
          })
        } else {
          resolve(true)
        }
      }),
    })
  }

  function handleAddCourse() {
    if (courseName.value.length === 0) {
      Toast('请填写日程名')
      return
    }
    if (!courseActive.length) {
      Toast('请确保至少有一个周数')
      return
    }

    handleAddCourseClick(requestDto.value)
  }

  return {
    courseDesc,
    courseActive,
    courseLocation,
    courseStep,
    colorActive,
    courseName,
    startIdx,
    endIdx,
    onCourseStepChange,
    handleWeekActiveClick,
    handleAddCourseClick,
    handleAddCourse,
    handleUpdateCourse,
    handleDeleteCourse,
  }
}
