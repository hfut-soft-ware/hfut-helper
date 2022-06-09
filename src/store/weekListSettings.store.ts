import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { WEEK_LIST_SETTINGS } from '@/shared/constant'
import type { ICourse } from '@/shared/types/response/course'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { useRef } from '@/shared/hooks/useRef'

export interface TWeekSettings{
  alpha: number
  token: string
  courseList: ICourse
}

export const enum LoverStatus {
  // eslint-disable-next-line no-unused-vars
  single,
  // eslint-disable-next-line no-unused-vars
  lover,
}

export const setWeekSettings = (payload: TWeekSettings) => {
  uni.setStorageSync(WEEK_LIST_SETTINGS, payload)
}

export const getWeekSettings = () => {
  const settings = uni.getStorageSync(WEEK_LIST_SETTINGS) as TWeekSettings
  const res = { alpha: 85, token: '', courseList: {} }

  if (!settings) {
    uni.setStorageSync(WEEK_LIST_SETTINGS, res)
    return res as TWeekSettings
  }
  return settings
}

export const SETTINGS_BACKGROUND_IMG = '__SETTINGS_BACKGROUND_IMG__'

const [getBgImgStorage, setBgImgStorage, removeBgImgStorage] = useSyncStorage(SETTINGS_BACKGROUND_IMG)

export type ImageMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

export const ImageModes: { title: string;mode: ImageMode }[] = [
  {
    title: '拉伸至填满屏幕',
    mode: 'scaleToFill',
  },
  {
    title: '完整显示图片',
    mode: 'aspectFit',
  },
  {
    title: '保证图片的短边完全显示',
    mode: 'aspectFill',
  },
  {
    title: '宽度不变，高度自动变化',
    mode: 'widthFix',
  },
  {
    title: '高度不变，宽度自动变化',
    mode: 'heightFix',
  },
  {
    title: '居中',
    mode: 'center',
  },
  {
    title: '显示顶部',
    mode: 'top',
  },
  {
    title: '显示底部',
    mode: 'bottom',
  },
  {
    title: '显示左边',
    mode: 'left',
  },
  {
    title: '显示右边',
    mode: 'right',
  },
  {
    title: '显示左上角',
    mode: 'top left',
  },
  {
    title: '显示右上角',
    mode: 'top right',
  },
  {
    title: '显示左下角',
    mode: 'bottom left',
  },
  {
    title: '显示右下角',
    mode: 'bottom right',
  },
]

const BG_IMG_MODE = '__BG_IMG_MODE__'

const [getBgImgModeStorage, setBgImgModeStorage] = useSyncStorage(BG_IMG_MODE)

export const useWeekListSettingsStore = defineStore('weekListSettings', () => {
  const settings = reactive<TWeekSettings>(getWeekSettings())
  const [showSettings, setShowSettings] = useRef(false)
  const [bgImg, setRefBgImg] = useRef(getBgImgStorage())
  const imgMode = ref<ImageMode>(getBgImgModeStorage('aspectFill'))

  const setAlpha = (value: number) => {
    settings.alpha = value
    setWeekSettings({ ...settings, alpha: value })
  }

  const setBgImg = (src: string) => {
    setBgImgStorage(src)
    setRefBgImg(src)
  }

  const removeBgImg = () => {
    removeBgImgStorage()
    setRefBgImg('')
  }

  const setImgMode = (mode: ImageMode) => {
    setBgImgModeStorage(mode)
    imgMode.value = mode
  }

  return {
    settings,
    setAlpha,
    showSettings,
    setShowSettings,
    bgImg,
    setBgImg,
    removeBgImg,
    imgMode,
    setImgMode,
  }
})
