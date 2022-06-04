import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getFlowWater } from '@/server/api/card'
import type { IFlowWaterData } from '@/shared/types/response/flowWater'

export const useFlowWaterStore = defineStore('flowWaterStore', () => {
  const totalPageNum = ref(1)
  const currentPage = ref(1)
  const recordList = reactive<IFlowWaterData[]>([])

  const getUserFlowWater = async(pageNum: number, isLoadNextPage = false) => {
    if (pageNum > totalPageNum.value) {
      Toast('已经是最后一页了\nᕙ(•̤᷆ ॒ ູ•̤᷇)ᕘ₊˚')
      return
    }

    currentPage.value = pageNum

    const currentDate = new Date()
    const startMonth = currentDate.getMonth() > 3 ? currentDate.getMonth() - 3 : 1
    const startDate = new Date(`${currentDate.getFullYear()}-${startMonth}-${currentDate.getDate()}`)

    const loadingMsg = isLoadNextPage ? '正在加载下一页流水数据中...' : '正在加载流水数据中....'
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: `${loadingMsg}\n${getRandomQAQ('happy')[0]}`,
    })

    await getFlowWater({ startDate, endDate: currentDate }, pageNum).then((res) => {
      const data = res.data.data
      totalPageNum.value = data.pageNum
      recordList.push(data)

      Toast.clear()
      Toast.success({
        message: `流水数据加载成功\n${getRandomQAQ('happy')[0]}`,
      })
      uni.stopPullDownRefresh()
    }).catch(() => {
      Toast.fail({
        message: `校务网络好像出了点问题哦\n${getRandomQAQ('sadness')[0]}`,
      })
      uni.stopPullDownRefresh()
    })
  }

  return {
    totalPageNum,
    recordList,
    currentPage,
    getUserFlowWater,
  }
})
