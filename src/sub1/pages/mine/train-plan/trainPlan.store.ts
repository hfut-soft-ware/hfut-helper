import { computed, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { defineStore } from 'pinia'
import { getTrainPlanRequest } from '@/server/api/user'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import type { ITrainPlanData } from '@/shared/types/response/train-plan'
import { useRef } from '@/shared/hooks/useRef'

export const TrainPlanKey = '__TRAIN_PLAN_DATA__'

export const [
  getTrainPlanStorage,
  setTrainPlanStorage,
  removeTrainPlanStorage,
] = useSyncStorage<ITrainPlanData>(TrainPlanKey)

const calculateProgress = (credit: string, totalCredit: string) => {
  const creditNum = Number(credit)
  const totalCreditNum = Number(totalCredit)
  return Math.min((creditNum / totalCreditNum) * 100, 100)
}

export const useTrainPlanStore = defineStore('useTrainPlanStore', () => {
  const data = ref<ITrainPlanData>(getTrainPlanStorage())
  const error = ref()

  const [selectedPlan, setSelectedPlan] = useRef<ITrainPlanData>({} as ITrainPlanData)

  const planData = computed(() => {
    if (!data.value) {
      return {}
    }
    data.value.planTypes = data.value.planTypes.map((item) => {
      return {
        ...item,
        progress: calculateProgress(item.credit, item.requiredCredit),
      }
    })
    return data.value
  })

  const getTrainPlan = async() => {
    Toast.loading({
      message: '加载培养方案中...',
      duration: 0,
    })
    getTrainPlanRequest().then((res) => {
      data.value = res.data.data
      setTrainPlanStorage(res.data.data)
      Toast.success({
        message: '加载成功',
      })
      error.value = null
    }).catch((err) => {
      error.value = (err as any).data.msg
      Toast.clear()
    }).finally(() => {
      uni.stopPullDownRefresh()
    })
  }

  return {
    planData,
    error,
    getTrainPlan,
    selectedPlan,
    setSelectedPlan,
  }
})
