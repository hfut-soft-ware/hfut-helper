<script setup lang="ts">
import { getRandomQAQ } from 'qaq-font'
interface Props {
  data: { id: string | number; [key: string]: any }[]
}
defineProps<Props>()
</script>

<template>
  <div class="w-[90vw] mx-auto py-10">
    <van-empty v-if="!data.length" :description="`空${getRandomQAQ('sadness')[0]}`" />
    <div v-else class="flex flex-col gap-3">
      <div v-for="item in data" :key="item.id" class="card-shadow bg-white flex flex-col gap-2 p-5 rounded-lg">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>
