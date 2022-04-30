<script lang='ts' setup>
import { computed } from 'vue'

interface Props {
  type: 'info' | 'error' | 'warning' | 'success'
  content: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  content: '',
})

const tipStyle = computed(() => getColor(props.type))

function getColor(type: Props['type']) {
  const color = { bg: '', icon: '', content: '' }

  const setColor = (bg: string, icon: string, txt: string) => {
    color.bg = bg
    color.icon = icon
    color.content = txt
  }
  switch (type) {
    case 'info':
      setColor('#E5F6FD', '#03a9f4', '#014361')
      break
    case 'error':
      setColor('#FDEDED', '#ef5350', '#5F2120')
      break
    case 'warning':
      setColor('#FFF4E5', '#ff9800', '#663C00')
      break
    case 'success':
      setColor('#EDF7ED', '#4caf50', '#1E4620')
      break
  }

  return color
}
</script>

<template>
  <div class="tip" :style="{backgroundColor: tipStyle.bg}">
    <div class="icon">
      <van-icon name="warning" :style="{color: tipStyle.icon}" />
    </div>
    <p class="content" :style="{color: tipStyle.content}">
      {{ props.content }}
    </p>
  </div>
</template>

<style lang='scss' scoped>
.tip {
  display: flex;
  align-items: center;
  background-color: #D0F2FF;
  padding: 10px 15px;
  border-radius: 5px;
  .content {
    color: rgb(4, 41, 122);
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
