<script lang='ts' setup>
import { onLoad, onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import Header from './Header.vue'
import CardList from './card-list.vue'
import { useCourseRequest } from './use-courseRequest'
import { usePlacard } from './use-placard'
import StatusBar from '@/components/status-bar/status-bar.vue'
import { useTouchInteractive } from '@/shared/hooks/useTouchInteractive'
import { useCourseListStore } from '@/store/courseList.store'
import { useCourseSearchStore } from '@/store/courseSearch.store'
import Placard from '@/components/Placard/Placard.vue'
import { isStorageEmpty } from '@/shared/hooks/use-syncStorage'
import { COURSE_KEY } from '@/shared/constant'

const { isLoading, error, courseRequest } = useCourseRequest()

const store = useCourseListStore()

const { onTouchStart, onTouchEnd } = useTouchInteractive(store)

const { placard, onClose } = usePlacard()

onLoad((query) => {
  if (query.refresh) {
    courseRequest(true)
  }
})

onMounted(() => {
  courseRequest(false)
})

const { mode } = storeToRefs(useCourseSearchStore())
onShow(() => {
  if (mode.value !== 'normal') {
    mode.value = 'normal'
    store.initCachedStore()
  }
})

</script>

<template>
  <van-toast id="van-toast" />
  <StatusBar :bg-color="'#F6F8FA'" />
  <Placard :message="placard" title="公告" @close="onClose" />
  <div
    class="w-screen bg-[#F6F8FA] pt-5 overflow-hidden"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="w-[100vw]">
      <Header :is-loading="isLoading" />
      <template v-if="!error || !isStorageEmpty(COURSE_KEY)">
        <CardList />
      </template>
      <template v-else>
        <van-empty description="未获取课程信息" />
      </template>
    </div>
  </div>
</template>
