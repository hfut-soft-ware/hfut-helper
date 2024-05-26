import { onMounted, ref } from 'vue'
// import { getPlacard } from '@/server/api/placard'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { PLACARD } from '@/shared/constant'

export interface Placard {
  data: string
  state: boolean
}

interface PlacardMessage {
  text: string
  link?: string
}

export function usePlacard() {
  const [
    getPlacardStorage,
    setPlacardStorage,
  ] = useSyncStorage<Placard>(PLACARD)

  const placard = ref<PlacardMessage>()

  const initPlacard = (message: PlacardMessage) => {
    placard.value = message
    setPlacardStorage({
      data: message,
      state: true,
    })
  }

  const onClose = () => {
    setPlacardStorage({
      data: placard.value,
      state: false,
    })
  }

  // getPlacard().then(({ data }) => {
  //   if (isStorageEmpty(PLACARD)) {
  //     initPlacard(data.data)
  //   } else {
  //     const storagePlacard = getPlacardStorage()
  //     if (storagePlacard.data !== data.data) {
  //       initPlacard(data.data)
  //     } else {
  //       if (storagePlacard.state) {
  //         placard.value = data.data
  //       }
  //     }
  //   }
  // })

  onMounted(() => {
    if (isStorageEmpty(PLACARD)) {
      initPlacard({
        text: '新版小肥书上线啦，快来体验一下吧！',
        link: 'https://bilibili.com',
      })
    } else {
      const storagePlacard = getPlacardStorage()
      if (storagePlacard.state) {
        initPlacard({
          text: '新版小肥书上线啦，快来体验一下吧！',
          link: 'https://bilibili.com',
        })
      }
    }
  })

  return {
    placard,
    onClose,
  }
}
