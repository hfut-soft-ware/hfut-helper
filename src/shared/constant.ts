export const TOKEN_KEY = '__TOKEN__'

export const COURSE_KEY = '__COURSE__'

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
