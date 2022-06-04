import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { format } from 'date-fns'
import { isArray } from 'lodash'
import type { IFlowWaterData } from '@/shared/types/response/flowWater'
import type { useFlowWaterStore } from '@/store/flowWater.store'
import { set } from '@/shared/utils/object'

export function useRecordedList(store: ReturnType<typeof useFlowWaterStore>) {
  const { recordList, currentPage } = storeToRefs(store)

  store.getUserFlowWater(1)

  const consumeRecord = computed(() => {
    const data = recordList.value

    const list: Record<string, IFlowWaterData['list'] & { total: number }> = {}

    data.forEach((cardItem) => {
      cardItem.list.forEach((item) => {
        const dateKey = format(new Date(item.time), 'yyyy-MM-dd')
        if (!isArray(list[dateKey])) {
          set(list, dateKey, [])
        }
        list[dateKey].push(item)
      })
    })

    return list
  })

  function handleNextPageClick() {
    store.getUserFlowWater(currentPage.value + 1, true)
  }

  return {
    consumeRecord,
    handleNextPageClick,
  }
}
