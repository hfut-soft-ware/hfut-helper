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

export type ImageMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix'

export const ImageModes: { title: string;mode: ImageMode }[] = [
  {
    title: '使图片的宽高完全拉伸至填满屏幕',
    mode: 'scaleToFill',
  },
  {
    title: '保持纵横比缩放图片, 完整地将图片显示出来',
    mode: 'aspectFit',
  },
  {
    title: '保持纵横比缩放图片，只保证图片的短边能完全显示出来。',
    mode: 'aspectFill',
  },
  {
    title: '宽度不变，高度自动变化，保持原图宽高比不变',
    mode: 'widthFix',
  },
  {
    title: '高度不变，宽度自动变化，保持原图宽高比不变',
    mode: 'heightFix',
  },
]

const BG_IMG_MODE = '__BG_IMG_MODE__'

const [getBgImgModeStorage, setBgImgModeStorage] = useSyncStorage(BG_IMG_MODE)

export const useWeekListSettingsStore = defineStore('weekListSettings', () => {
  const settings = reactive<TWeekSettings>(getWeekSettings())
  const [showSettings, setShowSettings] = useRef(false)
  const [bgImg, setRefBgImg] = useRef(getBgImgStorage<string>())
  const imgMode = ref<ImageMode>(getBgImgModeStorage<ImageMode>('aspectFit'))

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
