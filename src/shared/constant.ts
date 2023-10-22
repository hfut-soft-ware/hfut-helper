import type { Tab } from './types'

export const TOKEN_KEY = '__TOKEN__'

export const COURSE_KEY = '__COURSE__'

export const USER_INFO_KEY = '__USER_INFO__'

export const WEEK_LIST_SETTINGS = '__WEEK_LIST_SETTINGS__'

export const USER_ACCOUNT_KEY = '__USER_ACCOUNT__'

export const USER_CARD_BASE_INFO = '__USER_CARD_BASE_INFO__'

export const PLACARD = '__PLACARD__'

export const SCHOOL_BUS_KEY = '__SCHOOL_BUS__'

export const SURVEY_PROMPTED = '__SURVEY_PROMPTED__'

export const SING_KEY = '__SING_KEY__'

export const ADVERTISE = '__ADVERTISE__'

export const dayHours = Array.from({ length: 8 }, (_, idx) => {
  let index: any = idx + 1
  let start
  if (idx >= 3) {
    index -= 1
  }
  if (idx === 2 || idx === 5) {
    index = null
  }
  if (idx === 6) {
    index = 5
    start = '19:00'
  }

  return {
    start: start || `${((idx) * 2 + 8).toString().padStart(2, '0')}:00`,
    index,
  }
})

export const CARD_COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'light-yellow',
  'light-blue',
  'pink',
  'grown',
  'light-green',
]

export type TColors = 'red' | 'blue' | 'green' | 'yellow' | 'purple'| 'light-yellow' | 'light-blue' | 'pink'| 'grown' | 'light-green'

export const scrollHeight = uni.getSystemInfoSync().windowHeight * 0.68

export const campusInfo = [
  { campusCode: '01', campusName: '屯溪路校区', towers: ['主楼', '西二'] },
  { campusCode: '02', campusName: '翡翠湖校区', towers: ['翠一教', '翠二教', '翠三教', '翠四教', '翠五教', '翠六教', '翠七教', '翠八教', '翠九教', '翠十教', '翠十教负', '翠十一教', '翠十二教'] },
  { campusCode: '03', campusName: '宣城校区', towers: ['新安学堂', '敬亭学堂'] },
]

export const lessonStartTimePrefixs = [0, 8, 9, 10, 11, 14, 15, 16, 17, 19, 20, 21]

export const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export const tabs: Tab[] = [
  {
    key: 'major',
    name: '专业排名',
  },
  {
    key: 'class',
    name: '教学班排名',
  },
  {
    key: 'school',
    name: '全校排名',
  },
]

export const assetsUrl = {
  advertise: 'https://hfut-space.top/static/images/imgs/ad.jpg',
  avatar: 'https://hfut-space.top/static/images/imgs/avatar.png',
  mineBg: 'https://hfut-space.top/static/images/imgs/mine-bg.jpg',
}
