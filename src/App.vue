<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {

})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

</script>

<template />
<style lang="scss">
@import "./components/wxcomponents/vant/common/index.wxss";
</style>
