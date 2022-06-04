import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getUserCardBaseInfo } from '@/server/api/user'
import type { ICardBaseInfo } from '@/shared/types/response/card'

export const useMineStore = defineStore('mineStore', () => {
  const cardState = ref<ICardBaseInfo>()

  const cardInfo = computed(() => {
    const card = cardState.value

    const res = {
      title: '一卡通余额',
      content: card?.balance || '¥¥¥',
    }

    if (card?.cardStatus) {
      res.content = `¥${card.balance}`
    } else if (card?.freeze) {
      res.title = '一卡通账户已被冻结'
      res.content = '请去学校相关部门进行解冻'
    } else if (card?.loss) {
      res.title = '一卡通账户已被挂失'
      res.content = '请去学校相关部门进行解挂'
    }

    return res
  })

  const getCardInfo = async() => {
    await getUserCardBaseInfo().then((res) => {
      cardState.value = res.data.data
    })
  }

  return {
    cardInfo,
    getCardInfo,
  }
})
