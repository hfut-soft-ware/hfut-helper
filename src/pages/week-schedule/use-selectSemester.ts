import { computed, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getCourseListRequest, getSemesters } from '@/server/api/user'
import { useCourseListStore } from '@/store/courseList.store'
import type { Semester } from '@/shared/types/response/semesters'

export function useSelectSemester() {
  const showSelectSemester = ref(false)
  const selectPickerLoading = ref(false)
  const semesters = ref<Semester[]>([])

  const courseListStore = useCourseListStore()

  const semesterColums = computed(() => {
    return semesters.value.map(semester => semester.name)
  })

  const closeSelectSemester = () => {
    showSelectSemester.value = false
  }

  const selectSemesterShow = () => {
    showSelectSemester.value = true
    selectPickerLoading.value = true
    getSemesters().then((res) => {
      semesters.value = res.data.data
      selectPickerLoading.value = false
    }).catch((err) => {
      Toast.fail('学期列表加载失败')
    })
  }

  const onConfirm = (event: any) => {
    const index = event.detail.index as number
    const id = semesters.value[index].id
    showSelectSemester.value = false
    Toast.loading('正在加载数据')
    getCourseListRequest(false, true, id).then((res) => {
      courseListStore.initStore(res.data.data)
      showSelectSemester.value = false
      Toast.clear()
      Toast.success('数据加载完成')
    }).catch((err) => {
      Toast.clear()
      Toast.fail('数据加载完成')
    })
  }

  return {
    showSelectSemester,
    semesters,
    selectPickerLoading,
    semesterColums,
    closeSelectSemester,
    selectSemesterShow,
    onConfirm,
  }
}
