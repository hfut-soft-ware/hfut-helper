<script lang='ts' setup>
interface Props {
  radius: number
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  radius: 2,
  color: 'sky',
})
</script>

<template>
  <span class="animate-bounce absolute right-2 flex justify-items-end items-center">
    <span
      class="animate-ping absolute inline-flex rounded-full opacity-75"
      :class="`bg-${props.color}-400 h-${props.radius} w-${props.radius}`"
    />
    <span class="relative inline-flex rounded-full" :class="`bg-${props.color}-500 h-${props.radius} w-${props.radius}`" />
  </span>
</template>
