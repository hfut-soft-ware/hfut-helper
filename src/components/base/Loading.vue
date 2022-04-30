<script lang='ts' setup>
interface Props {
  content: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '加载中',
})

</script>

<template>
  <view class="container">
    <van-loading vertical color="#1989fa">
      {{ props.content }}
    </van-loading>
  </view>
</template>

<style lang='scss' scoped>
.container {
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
