<script setup lang='ts'>
import { computed, ref } from 'vue'
import type { Semester } from '@/shared/types/response/semesters'

const props = defineProps<{
  semesters: Semester[]
}>()

const emit = defineEmits<{
  (e: 'change', semester: Semester): void
}>()

const pickerIndex = ref(0)

const semesterNames = computed(() => props.semesters.map(item => item.name))
const handlePickerChange = (event: { detail: { value: string } }) => {
  const index = +event.detail.value
  pickerIndex.value = index
  emit('change', props.semesters[index])
}

</script>

<template>
  <picker :range="semesterNames" :value="pickerIndex" @change="handlePickerChange">
    <slot :semester="semesters[pickerIndex]" />
  </picker>
</template>
