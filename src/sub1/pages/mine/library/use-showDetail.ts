import { useDebounceFn } from '@vueuse/core'
import Toast from '@vant/weapp/lib/toast/toast'
import { ref } from 'vue'
import { getLibraryDetailRequest } from '@/server/api/library'
import type { ILibraryDetailData } from '@/shared/types/response/library-detail'

export function useShowDetail() {
  const detailData = ref<ILibraryDetailData[]>()

  const show = ref(false)

  const onClose = () => {
    show.value = false
  }

  const onShowDetailClick = useDebounceFn((id: number) => {
    Toast.loading({
      duration: 0,
      message: '加载中',
    })
    getLibraryDetailRequest(id)
      .then((res) => {
        show.value = true
        detailData.value = res.data.data
      })
      .catch((err) => {

      })
      .finally(() => {
        Toast.clear()
      })
  }, 200)

  return {
    show,
    detailData,
    onShowDetailClick,
    onClose,
  }
}
