<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { onReachBottom } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import { useMineStore } from '@/store/mine.store'
import { getSchoolList } from '@/server/api/school'
import type { School } from '@/shared/types/response/school'

const mineStore = useMineStore()
const { currentSchool } = storeToRefs(mineStore)
const pageNum = ref(0)
const schoolList = ref<School[]>([])
const loading = ref(false)

const handleClick = (school: School) => {
  currentSchool.value = school
  uni.navigateBack({})
}

const fetchSchools = async() => {
  pageNum.value += 1
  loading.value = true
  const { data } = await getSchoolList({ pageNum: pageNum.value, pageSize: 20 })
  schoolList.value.push(...data.data.schools)
}

onMounted(() =>
  fetchSchools(),
)

onReachBottom(() =>
  fetchSchools(),
)

</script>

<template>
  <div class="h-full w-full bg-gray-100">
    <div>
      <p class="mt-2 px-4 py-1 text-gray-500">
        当前选择
      </p>
      <div class="bg-white px-4 py-2">
        <p>{{ currentSchool.name }}</p>
        <!-- <span class="text-green-500 text-sm">已开通</span> -->
      </div>
    </div>

    <div>
      <p class="my-2 px-4 py-1 text-gray-500">
        已开通学校
      </p>
      <div v-for="school in schoolList" :key="school.id" class="border-b border-gray-300 bg-white px-4 py-2" @click="() => handleClick(school)">
        <p>{{ school.name }}</p>
        <!-- <span class="text-green-500 text-sm">已开通</span> -->
      </div>
      <div class="flex justify-center mt-4">
        <van-loading color="#1989fa" :size="40" />
      </div>
    </div>
  </div>
</template>
