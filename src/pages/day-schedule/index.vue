<script lang='ts' setup>
import Header from './Header.vue'
import CardList from './card-list.vue'
import { useCourseRequest } from './use-courseRequest'
import StatusBar from '@/components/status-bar/status-bar.vue'
import { useTouchInteractive } from '@/shared/hooks/useTouchInteractive'
import { useCourseListStore } from '@/store/courseList.store'
import { usePullDownUpdateCourse } from '@/shared/hooks/use-PullDownUpdateCourse'
import { isEmptyObject } from '@/shared/utils'

const { isLoading, state } = useCourseRequest()

const store = useCourseListStore()

const { onTouchStart, onTouchEnd } = useTouchInteractive(store)

usePullDownUpdateCourse()

</script>

<template>
  <StatusBar />
  <div
    class="w-screen bg-[#F6F8FA] pt-5"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <template v-if="!isEmptyObject(state) && !isLoading">
      <div class="w-[100vw]">
        <Header />
        <CardList />
      </div>
    </template>
    <van-toast id="van-toast" />
  </div>
</template>
