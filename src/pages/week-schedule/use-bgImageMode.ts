import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { useWeekListSettingsStore } from '@/store/weekListSettings.store'

export function useBgImageMode(store: ReturnType<typeof useWeekListSettingsStore>) {
  const { imgMode } = storeToRefs(store)

  const imgModeShow = ref(false)

  function handleImageModeClick(evt: any) {
    store.setImgMode(evt.currentTarget.dataset.name)
  }

  function handleImageModeChange(evt: any) {
    store.setImgMode(evt.detail)
  }

  function onImgModeClose() {
    imgModeShow.value = false
  }

  function openImgModeSetting() {
    imgModeShow.value = true
  }

  return {
    imgModeShow,
    imgMode,
    openImgModeSetting,
    handleImageModeClick,
    handleImageModeChange,
    onImgModeClose,
  }
}
