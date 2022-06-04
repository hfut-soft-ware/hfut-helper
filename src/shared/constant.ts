export const TOKEN_KEY = '__TOKEN__'

export const COURSE_KEY = '__COURSE__'

export const USER_INFO_KEY = '__USER_INFO__'

export const WEEK_LIST_SETTINGS = '__WEEK_LIST_SETTINGS__'

export const USER_ACCOUNT_KEY = '__USER_ACCOUNT__'

export const USER_CARD_BASE_INFO = '__USER_CARD_BASE_INFO__'

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
]
