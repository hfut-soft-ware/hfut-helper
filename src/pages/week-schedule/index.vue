<script lang='ts' setup>
import Header from '@/pages/week-schedule/header.vue'
import { useCourseRequest } from '@/pages/day-schedule/use-courseRequest'

const { isLoading, error, state } = useCourseRequest()
</script>

<template>
  <template v-if="state && !isLoading">
    <Header />
  </template>
</template>

<style lang='scss' scoped>

</style>
