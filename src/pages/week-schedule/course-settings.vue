<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import Toast from '@vant/weapp/lib/toast/toast'
import { ImageModes, useWeekListSettingsStore } from '@/store/weekListSettings.store'
import { uesLoverStore } from '@/store/lover.store'
import { useLoverPoem } from '@/shared/hooks/use-LoverPoem'
import { useBgImageMode } from '@/pages/week-schedule/use-bgImageMode'

const store = useWeekListSettingsStore()
const { settings, showSettings, bgImg } = storeToRefs(store)

const {
  imgMode,
  imgModeShow,
  onImgModeClose,
  handleImageModeClick,
  handleImageModeChange,
  openImgModeSetting,
} = useBgImageMode(store)

function onOpacityChange(evt: any) {
  store.setAlpha(evt.detail.value)
}
function onBindLover() {
  uni.navigateTo({
    url: '/pages/login/login?lover=true',
  })
}

const loverStore = uesLoverStore()
const { isLover, isLoverRelieved } = storeToRefs(loverStore)
const { getPoemOnConfirm, getPoemOnCanceled } = useLoverPoem()

const loverChecked = ref(isLover.value)
function onLoverCheckedChange(evt: any) {
  const status = evt.detail
  loverChecked.value = status
  loverStore.setLover(status, true)
}

function onRelieveLoverClick() {
  Dialog.confirm({
    title: '解绑情侣课表',
    message: '确定要解绑Ta的课表吗？',
  }).then(() => {
    loverStore.loverLogout()
    Toast({
      message: getPoemOnConfirm(),
      duration: 5000,
    })
  }).catch(() => {
    Toast({
      message: getPoemOnCanceled(),
      duration: 5000,
    })
  })
}

function handleChooseBgImg() {
  uni.chooseImage({
    count: 1,
    sizeType: ['original'],
    sourceType: ['album'],
    success(res) {
      store.setBgImg(res.tempFilePaths[0])
    },
  })
}

function handleRemoveBgImg() {
  store.removeBgImg()
}

function onClose() {
  store.setShowSettings(false)
}

function onOpenImgModeSetting() {
  store.setShowSettings(false)
  openImgModeSetting()
}
</script>

<template>
  <van-popup
    :show="imgModeShow"
    round
    closeable
    position="bottom"
    custom-style="height: 45%"
    @close="onImgModeClose"
  >
    <div class="p-2">
      <h3 class="font-semibold text-center">
        背景图片设置
      </h3>
      <van-radio-group :value="imgMode" @change="handleImageModeChange">
        <van-cell-group>
          <div class="flex flex-col gap-3 mt-5">
            <van-cell
              v-for="item in ImageModes"
              :key="item.mode"
              :title="item.title"
              clickable
              :data-name="item.mode"
              @click="handleImageModeClick"
            >
              <van-radio slot="right-icon" :name="item.mode" />
            </van-cell>
          </div>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>

  <van-popup
    :show="showSettings"
    round
    closeable
    position="bottom"
    custom-style="height: 60%"
    @close="onClose"
  >
    <div class="flex flex-col p-5">
      <h3 class="font-semibold w-full text-center">
        课表设置
      </h3>
      <van-divider content-position="center">
        背景设置
      </van-divider>
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-3">
          <p class="text-sm">
            课表透明度: {{ settings.alpha }} %
          </p>
          <van-slider :value="settings.alpha" @drag="onOpacityChange" />
        </div>
        <div class="flex flex-col gap-5">
          <div class="flex gap-3">
            <div
              class="flex-1 bg-[#3F51B5] shadow-lg btn text-sm"
              @click="handleChooseBgImg"
            >
              选择背景图片
            </div>
            <template v-if="bgImg.length > 0">
              <div
                class="flex-1 border-[1px] border-red-400/80 btn"
                @click="handleRemoveBgImg"
              >
                <p class="text-red-500">
                  删除背景图片
                </p>
              </div>
            </template>
          </div>
          <template v-if="bgImg.length > 0">
            <div class="btn bg-[#7582EB] shadow-lg" @click="onOpenImgModeSetting">
              调整背景图片
            </div>
          </template>
        </div>
      </div>
      <van-divider content-position="center">
        情侣课表
      </van-divider>
      <div class="flex flex-col gap-3 text-sm">
        <template v-if="isLoverRelieved">
          <div class="bg-[#EB3D76] btn shadow-lg text-white" @click="onBindLover">
            绑定Ta
          </div>
        </template>
        <template v-else>
          <div class="flex justify-between">
            <p>
              {{ isLover ? '切换到我的课表' : '切换到Ta的课表' }}
            </p>
            <van-switch :checked="loverChecked" @change="onLoverCheckedChange" />
          </div>
          <div class="bg-gray-500/50 btn" @click="onRelieveLoverClick">
            解绑Ta的课表
          </div>
        </template>
      </div>
      <div />
    </div>
  </van-popup>
</template>

<style lang='scss' scoped>

</style>
