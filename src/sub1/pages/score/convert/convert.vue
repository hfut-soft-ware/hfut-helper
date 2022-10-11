<script setup lang='ts'>
import { useExpression } from './use-expression'
import { symbols } from './constant'

const {
  expression,
  tipList,
  tipShow,
  statements,
  grammerCheckMsg,
  handleTipClick,
  handleSymbolClick,
  inputClear,
  handleCheck,
  handleConfirm,
  deleteStatement,
  editStatement,
} = useExpression()

</script>

<template>
  <van-toast id="van-toast" />
  <van-dialog id="van-dialog" />
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
          <div class="text-blue-500" @click="handleCheck">
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
    <div class=" p-3 box-border min-h-[100px] text-sm" :class="grammerCheckMsg === '语法校验成功!' ? 'text-green-500' : 'text-red-500'">
      {{ grammerCheckMsg }}
    </div>
    <div v-if="statements.length" class="mt-4 p-3 box-border card-shadow border border-slate-200 rounded-xl">
      <div class="mb-3 flex items-center justify-between">
        <div class="font-semibold">
          表达式列表
        </div>
        <div class="text-blue-500 p-2" @click="handleConfirm">
          提交
        </div>
      </div>
      <div v-for="(statement, index) in statements" :key="statement" class="flex text-sm h-10 items-center">
        <div class="truncate flex-1 mr-2 text-[#616161]">
          {{ statement }}
        </div>
        <div class="text-blue-500 p-2" @click="editStatement(index)">
          编辑
        </div>
        <div class="text-red-500 p-2" @click="deleteStatement(index)">
          删除
        </div>
      </div>
    </div>
  </div>
</template>
