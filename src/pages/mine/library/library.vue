<script lang='ts' setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import Toast from '@vant/weapp/lib/toast/toast'
import { getLibrarySearchRequest } from '@/server/api/library'
import { useShowDetail } from '@/pages/mine/library/use-showDetail'
import type { ILibraryDetailData } from '@/shared/types/response/library-detail'

const {
  show,
  detailData,
  onClose,
  onShowDetailClick,
} = useShowDetail()

const bookName = ref('')
const page = ref(1)

const data = ref()
const error = ref()

const items: { title: string; key: keyof ILibraryDetailData }[] = [
  { title: '索书号', key: 'bookIndex' },
  { title: '条号码', key: 'barcodeNumber' },
  { title: '年卷期', key: 'pubYear' },
  { title: '馆藏地', key: 'collectionPlace' },
  { title: '书刊状态', key: 'bookState' },
]

const onSearchClick = useDebounceFn(() => {
  Toast.loading({
    message: '加载中',
    duration: 0,
  })
  getLibrarySearchRequest(bookName.value, page.value)
    .then((res) => {
      error.value = null
      data.value = res.data.data
    })
    .catch((err) => {
      error.value = (err as any).data.msg
    }).finally(() => {
      Toast.clear()
    })
}, 500)
</script>

<template>
  <van-toast id="van-toast" />
  <van-popup
    :show="show"
    round
    closeable
    position="bottom"
    custom-style="height: 50%"
    @close="onClose"
  >
    <div class="mt-10 px-2">
      <div class="grid gap-2">
        <div class="flex">
          <div
            v-for="item in items"
            :key="item.title"
            class="flex-1 grid gap-2 text-center"
          >
            <p>{{ item.title }}</p>
            <div
              v-for="val in detailData"
              :key="val.barcodeNumber"
              class="text-center text-xs"
            >
              {{ val[item.key] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
  <div class="w-screen min-h-screen bg-gray-100">
    <div class="w-[95vw] mx-auto pt-2">
      <div class="flex gap-3 items-center box-border px-[2.5vw]">
        <div class="flex inset-y-0 left-0 items-center">
          <van-icon name="search" />
        </div>
        <input
          id="default-search"
          v-model="bookName"
          type="search"
          class="block p-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="请输入书名"
        >
        <button
          class="flex w-20 h-10 justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm dark:bg-blue-600"
          @click="onSearchClick"
        >
          搜索
        </button>
      </div>
      <div class="mt-5">
        <template v-if="!error">
          <div class="grid gap-2">
            <div
              v-for="item in data"
              :key="item.marcRecNo"
              class="card-shadow rounded-lg p-5 bg-white"
              @click="onShowDetailClick(item.marcRecNo)"
            >
              <p>{{ item.title }}</p>
              <van-divider />
              <div class="flex justify-between">
                <div class="grid gap-2 text-sm text-gray-500">
                  <p>{{ item.author }}</p>
                  <p>{{ item.publisher }} {{ item.pubYear }}</p>
                </div>
                <div class="text-center text-[#1D4ED8]">
                  <img class="w-[40px] h-[40px]" src="./library.png">
                  <p>查看馆藏</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            :description="error"
          />
        </template>
      </div>
    </div>
  </div>
</template>
