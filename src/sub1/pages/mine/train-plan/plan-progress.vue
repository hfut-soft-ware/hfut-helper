<script lang='ts' setup>
interface Props {
  progress: number
}

const { progress } = withDefaults(defineProps<Props>(), {
  progress: 0,
})

</script>

<template>
  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div class="ease-in-out bg-blue-600 h-2.5 rounded-full duration-200" :style="`width: ${progress}%`" />
  </div>
</template>
