<script setup lang='ts'>
import { ref } from 'vue'
type Props = {
  title: string
  message: string
}
defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
const show = ref(true)

const handleClick = () => {
  emits('close')
  show.value = false
}

</script>

<template>
  <div v-if="show && message" class="fixed w-full h-full left-0 top-0 z-[1100] bg-black/70 flex items-center justify-center">
    <div class="box-border relative w-4/5 px-8 pt-8 pb-10 rounded-xl bg-white">
      <div class="absolute p-1 top-2 right-2" @click="handleClick">
        <van-icon name="cross" size="20px" color="#c8c9cc" />
      </div>
      <h3 class="text-center text-lg mb-3">
        {{ title }}
      </h3>
      <p class="text-sm text-slate-500/80">
        {{ message }}
      </p>
    </div>
  </div>
</template>
