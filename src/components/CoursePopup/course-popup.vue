<script lang='ts' setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { CourseData } from '@/store/courseList.store'
import { getTeachers, useCourseListStore } from '@/store/courseList.store'
import type { TCourseDetail } from '@/components/CourseDetail/course-detail.vue'
import CourseDetail from '@/components/CourseDetail/course-detail.vue'
import { useEditSchedule } from '@/components/CoursePopup/use-editSchedule'
import CreateCustomPage from '@/components/CreateCustomPage/CreateCustomPage.vue'

interface Props {
  show: boolean
  data: CourseData
  isCustom: boolean
  weekday: number
}

interface Emits {
  (e: 'close'): void
}

const courseStore = useCourseListStore()
const { weekSchedule } = storeToRefs(courseStore)

const { data, show, isCustom, weekday } = defineProps<Props>()
const emit = defineEmits<Emits>()

const popupShow = ref(show)

const isExam = computed(() => data.detail?.type === 'Exam')

const popupHeight = computed(() => {
  return (isExam.value || isCustom) ? 50 : 85
})

// 判断是不是考试或者自定义，来让高度减小
const isShortCourse = computed(() => isExam.value || isCustom)
const scrollStyle = computed(() => `height: ${400 * (popupHeight.value / (isShortCourse.value ? 200 : 100))}px;`)

const headerInfo = computed(() => {
  const res = [
    {
      title: '考试名称',
      value: data.detail!.courseName,
    },
    {
      title: '考试时间',
      value: `${data.course!.startTime} - ${data.course!.endTime}`,
    },
  ]

  if (!isExam.value) {
    const item = res[0]
    item.title = '老师名字'
    item.value = getTeachers(data.detail!.detailInfo.teachers)
    res[1].title = '上课时间'
  }

  if (isCustom) {
    res[0].title = '地点'
    res[0].value = data.course!.room
    res[1].title = '时间'
  }

  return res
})

const lessonDetailList = computed<TCourseDetail[]>(() => {
  const detail = data.detail!

  if (isExam.value) {
    return [
      {
        icon: 'location-o',
        title: '考试地点',
        value: data.course?.room,
      },
    ]
  } else if (isCustom) {
    return [
      {
        icon: 'comment-o',
        title: '备注',
        value: data.detail!.detailInfo.mark,
      },
    ]
  }

  return [
    {
      icon: 'location-o',
      title: '上课地点',
      value: data.course?.room,
    },
    {
      icon: 'bookmark-o',
      title: '学分',
      value: detail.detailInfo.credits,
    },
    {
      icon: 'fire-o',
      title: '上课班级',
      value: detail.detailInfo.adminClass,
    },
    {
      icon: 'notes-o',
      title: '上课周数',
      value: detail.detailInfo.weeks,
    },

    {
      icon: 'friends-o',
      title: '上课人数',
      value: detail.detailInfo.studentCount,
    },
    {
      icon: 'apps-o',
      title: '课程类型',
      value: detail.detailInfo.courseTypeName,
    },
    {
      icon: 'coupon-o',
      title: '课程代码',
      value: detail.detailInfo.code,
    },
  ]
})

function onClose() {
  emit('close')
}

const {
  editShow,
  onScheduleClose,
  onEditUpdated,
  onEditScheduleClick,
} = useEditSchedule(data)

</script>

<template>
  <van-popup
    :show="editShow"
    closeable
    round
    position="bottom"
    custom-style="height: 80%"
    @close="() => {
      onScheduleClose()
      onClose()
    }"
  >
    <CreateCustomPage
      :detail="data.detail"
      :is-custom="isCustom"
      :course-data="data"
      :type="'update'"
      :current-week="weekSchedule.weekIdx + 1"
      :current-day="weekday"
      :title="'编辑日程'"
      :start-index="data.course?.lessonStartIndex"
      :name="data.detail?.courseName"
      :location="data.course?.room"
      :desc="data.detail?.detailInfo?.mark"
      @updated="() => {
        onClose()
        onEditUpdated()
      }"
    />
  </van-popup>
  <van-popup
    :show="popupShow"
    round
    closeable
    position="bottom"
    :custom-style="`height: ${popupHeight}%`"
    :overlay-style="(isExam || isCustom) ? '' : 'background-color: #4981F9'"
    @close="onClose"
  >
    <div class="container">
      <div class="header">
        <div class="courseName">
          <div :class="`line ${isExam ? 'line-exam' : isCustom ? 'line-custom' : ''}`" />
          <p class="text-lg font-medium">
            {{ data.detail?.courseName }}
          </p>
        </div>
        <div class="info w-[85%] mx-auto mt-3">
          <div v-for="item in headerInfo" :key="item.value" class="flex flex-col gap-3 items-center">
            <p class="text-xs text-slate-400">
              {{ item.title }}
            </p>
            <p class="text-sm">
              {{ item.value }}
            </p>
          </div>
        </div>
        <div class="mt-5">
          <van-divider />
        </div>
        <scroll-view
          id="scroller"
          scroll-y
          :style="scrollStyle"
        >
          <CourseDetail :detail="lessonDetailList" />
        </scroll-view>
      </div>
      <div
        v-if="!isExam && isCustom"
        class="border-[1px] mt-10 border-[#5079D0] font-semibold text-center py-3 px-5 rounded-full text-[#4C81F8]"
        @click="() => {
          popupShow = false
          onEditScheduleClick()
        }"
      >
        修改日程
      </div>
    </div>
  </van-popup>
</template>

<style lang='scss' scoped>
@mixin generateCardStyle($bgColor) {
  background: $bgColor;
}

.week-active {
  @apply bg-blue-500 text-white;
}

.color-active {
  @apply  border-2 border-blue-500;
}

.yellow {
  @include generateCardStyle(#FCEBCD);
}
.light-yellow {
  @include generateCardStyle(#FCEBCF);
}
.light-blue {
  @include generateCardStyle(#E6F4FF);
}
.blue {
  @include generateCardStyle(#E6F3FE);
}
.pink {
  @include generateCardStyle(#FFEEF8);
}
.red {
  @include generateCardStyle(#FFEFF0);
}
.grown {
  @include generateCardStyle(#FFF9C9);
}
.light-green {
  @include generateCardStyle(#DEFBF7);
}
.green {
  @include generateCardStyle(#E2F9F3);
}
.blue {
  @include generateCardStyle(#E6F4FF);
}
.purple {
  @include generateCardStyle(#FAEDFF);
}

.container {
  @apply w-[85%] mx-auto mt-5 relative;
  .header {
    @apply flex flex-col;
    .courseName {
      @apply flex gap-4 items-center;
      .line {
        @apply w-1 h-8 rounded-lg bg-[#{$green}];
      }
      .line-exam {
        background-color: $red !important;
      }
      .line-custom {
        background-color: $blue !important;
      }
    }
    .info {
      @apply flex justify-between;
    }
  }

}
</style>
