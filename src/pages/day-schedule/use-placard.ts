import { ref } from 'vue'
import { getPlacard } from '@/server/api/placard'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { PLACARD } from '@/shared/constant'

export interface Placard {
  data: string
  state: boolean
}

export function usePlacard() {
  const [
    getPlacardStorage,
    setPlacardStorage,
  ] = useSyncStorage<Placard>(PLACARD)

  const placard = ref<string>('')

  const initPlacard = (str: string) => {
    placard.value = str
    setPlacardStorage({
      data: str,
      state: true,
    })
  }

  const onClose = () => {
    setPlacardStorage({
      data: placard.value,
      state: false,
    })
  }

  getPlacard().then(({ data }) => {
    if (isStorageEmpty(PLACARD)) {
      initPlacard(data.data)
    } else {
      const storagePlacard = getPlacardStorage()
      if (storagePlacard.data !== data.data) {
        initPlacard(data.data)
      } else {
        if (storagePlacard.state) {
          placard.value = data.data
        }
      }
    }
  })

  return {
    placard,
    onClose,
  }
}
