<script setup lang='ts'>
import { useExpression } from './use-expression'
import { symbols } from './constant'

const { expression, tipList, tipShow, handleTipClick, handleSymbolClick, inputClear, handleConfirm } = useExpression()

</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen box-border px-[5vw]" @click="() => tipShow = false">
    <div class="mt-5 card-shadow border border-slate-200 rounded-[22px] overflow-hidden">
      <van-field
        clearable
        placeholder="请输入表达式"
        :value="expression"
        :adjust-position="false"
        @change="(e:any) => expression = e.detail"
        @clear="inputClear"
      >
        <template #button>
          <div class="text-blue-500" @click="handleConfirm">
            确定
          </div>
        </template>
      </van-field>
    </div>
    <div class="relative">
      <div v-if="tipShow" class="absolute w-[90vw]  h-[160px] bg-white border border-slate-200 rounded-md top-1 left-1/2 -translate-x-1/2">
        <div v-for="tip in tipList" :key="tip.item.name" class="flex items-center justify-between h-8 px-3" @click.stop="handleTipClick(tip.item.name)">
          <p>{{ tip.item.name }}</p>
          <p class="text-slate-400">
            {{ tip.item.credit }}
          </p>
        </div>
      </div>
    </div>
    <div class=" flex items-center justify-around mt-2 h-10 border border-slate-200 rounded-[20px]">
      <div v-for="symbol in symbols" :key="symbol" class="p-1" @click="handleSymbolClick(symbol)">
        {{ symbol }}
      </div>
    </div>
  </div>
</template>
