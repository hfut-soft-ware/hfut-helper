import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { handleError } from '@/shared/utils/index'
import { getAllCourseOptionsRequest, getAllCourseQueryRequest } from '@/server/api/user'
import type { IAllCourseOptionsData } from '@/shared/types/response/all-course-options'
import type { IGetAllCourseDto } from '@/shared/types/dto/getAllCourse'
import { useCourseListStore } from '@/store/courseList.store'

export type TCourseSearchMode = 'normal' | 'search'

export const useCourseSearchStore = defineStore('courseSearch', () => {
  const mode = ref<TCourseSearchMode>('normal')
  const settingShow = ref(false)
  const options = ref<IAllCourseOptionsData>({} as IAllCourseOptionsData)

  const courseStore = useCourseListStore()

  const semesterOptions = computed(() => options.value.semesters.map(item => item.semesterName))
  const semesterRef = ref()
  const semesters = computed({
    get() {
      return semesterRef.value || semesterOptions.value[0] || '请选择学年'
    },
    set(val: string) {
      semesterRef.value = val
    },
  })

  const campusesOptions = computed(() => options.value.campuses.map(item => item.campus))
  const campusesRef = ref()
  const campuses = computed({
    get() {
      return campusesRef.value || campusesOptions.value[0] || '请选择校区'
    },
    set(val: string) {
      campusesRef.value = val
    },
  })
  const currentCampus = computed(() => options.value.campuses.find(item => item.campus === campuses.value))

  const collegesOptions = computed(() => currentCampus.value?.colleges.map(item => item.college) || [])
  const collegesRef = ref()
  const colleges = computed({
    get() {
      return collegesRef.value || collegesOptions.value[0] || '请选择学院'
    },
    set(val: string) {
      collegesRef.value = val
      majorRef.value = null
      gradsRef.value = null
      classesRef.value = null
    },
  })
  const currentCollege = computed(() => currentCampus.value?.colleges.find(item => item.college === colleges.value))

  const majorOptions = computed(() => currentCollege.value?.majors.map(item => item.major) || [])
  const majorRef = ref()
  const major = computed({
    get() {
      return majorRef.value || majorOptions.value[0] || '请选择专业'
    },
    set(val: string) {
      majorRef.value = val
      gradsRef.value = null
      classesRef.value = null
    },
  })
  const currentMajor = computed(() => currentCollege.value?.majors.find(item => item.major === major.value))

  const gradsOptions = computed(() => currentMajor.value?.grades.map(item => item.grade) || [])
  const gradsRef = ref<number | string | null>()
  const grads = computed({
    get() {
      return gradsRef.value || gradsOptions.value[0] || '请选择年级'
    },
    set(val: number | string) {
      gradsRef.value = val
      classesRef.value = null
    },
  })
  const currentGrad = computed(() => currentMajor.value?.grades.find(item => item.grade === grads.value))

  const classesOptions = computed(() => currentGrad.value?.adminClass || [])
  const classesRef = ref()
  const classes = computed({
    get() {
      return classesRef.value || classesOptions.value[0] || '请选择班级'
    },
    set(val: string) {
      classesRef.value = val
    },
  })

  const openSetting = () => {
    settingShow.value = true
  }

  const closeSetting = () => {
    settingShow.value = false
  }

  const getAllCourseOptions = async() => {
    await getAllCourseOptionsRequest().then((res) => {
      options.value = res.data.data
    }).catch((error) => {
      Toast.fail({
        message: `获取课表信息失败，求交流群问问吧\n${getRandomQAQ('sadness')[0]}\n${error?.data?.msg}`,
      })
    })
  }

  const getAllCourseDto = computed<IGetAllCourseDto>(() => ({
    semesterId: options.value.semesters.find(item => item.semesterName === semesters.value)?.semesterId,
    campus: campuses.value,
    college: colleges.value,
    major: major.value,
    grade: grads.value,
    adminClass: classes.value,
  } as IGetAllCourseDto))

  const getAllCourseQuery = async() => {
    Toast.loading({
      duration: 0,
      message: `全校课表加载中...\n${getRandomQAQ('happy')[0]}`,
    })
    await getAllCourseQueryRequest(getAllCourseDto.value).then((res) => {
      Toast.success({
        message: `加载成功\n${getRandomQAQ('happy')[0]}`,
      })
      courseStore.initSearchStore(res.data.data)
    }).catch((error) => {
      handleError(error, '加载失败')
    })
  }

  return {
    mode,
    settingShow,
    options,
    semesters,
    semesterOptions,
    campuses,
    campusesOptions,
    colleges,
    collegesOptions,
    major,
    majorOptions,
    grads,
    gradsOptions,
    classes,
    classesOptions,
    getAllCourseQuery,
    getAllCourseOptions,
    closeSetting,
    openSetting,
  }
})
