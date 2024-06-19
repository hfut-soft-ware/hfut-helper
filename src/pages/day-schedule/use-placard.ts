import { onMounted, ref } from 'vue'
// import { getPlacard } from '@/server/api/placard'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { PLACARD } from '@/shared/constant'

export interface Placard {
  data: string
  state: boolean
  time: number
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
      time: 0,
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

  const shouldInitPlacard = () => {
    if (isStorageEmpty(PLACARD)) {
      return true
    }
    const storagePlacard = getPlacardStorage()
    if (Date.now() - storagePlacard.time > 2 * 60 * 60 * 1000) {
      return true
    } else {
      return false
    }
  }

  onMounted(() => {
    if (shouldInitPlacard()) {
      initPlacard({
        text: '小肥书App是space团队推出的新一代应用。它不仅继承了space的课表功能（数据同步），还增加了发布帖子和交流的功能。特别的是，小肥书还有一个专门的二手交易模块，方便大家发布和购买二手商品。相比space，使用体验更佳，功能更加丰富。强烈推荐同学们来试试小肥书吧！',
        link: 'https://xq261aa61x.feishu.cn/file/IK5fbSt2uoleq2xS5NOc1UKunIh',
      })
    }
  })

  return {
    placard,
    onClose,
  }
}
