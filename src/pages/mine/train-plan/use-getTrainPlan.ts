import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { getTrainPlanRequest } from '@/server/api/user'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'
import type { ITrainPlanData } from '@/shared/types/response/train-plan'

export const TrainPlanKey = '__TRAIN_PLAN_DATA__'

export const [
  getTrainPlanStorage,
  setTrainPlanStorage,
  removeTrainPlanStorage,
] = useSyncStorage<ITrainPlanData>(TrainPlanKey)

export function useGetTrainPlan() {
  const data = ref(getTrainPlanStorage())
  const error = ref()

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
    }).catch((err) => {
      error.value = (err as any).data.msg
    }).finally(() => {
      uni.stopPullDownRefresh()
    })
  }

  onPullDownRefresh(() => {
    getTrainPlan()
  })

  if (isStorageEmpty(TrainPlanKey)) {
    getTrainPlan()
  }

  return {
    data,
    error,
  }
}
