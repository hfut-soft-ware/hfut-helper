import { addDays, addWeeks, eachDayOfInterval, eachWeekOfInterval } from 'date-fns'

export const currentTime = new Date()
export const currentSemesterStartDate = new Date('2022-02-28')
export const currentSemesterEndDate = addWeeks(new Date('2022-07-17'), 1)

export const currentSemesterWeeks = eachWeekOfInterval({
  start: currentSemesterStartDate,
  end: currentSemesterEndDate,
}, {
  weekStartsOn: 1,
})

export const activeWeekIdx = currentSemesterWeeks.findIndex(week => currentTime < week) - 1

export const buildWeek = (idx: number) => {
  return eachDayOfInterval({
    start: currentSemesterWeeks[idx],
    end: currentSemesterWeeks[idx + 1],
  }).slice(0, 7)
}

export const currentWeek = buildWeek(activeWeekIdx)

export const currentDayIdx = currentWeek.findIndex((day, index) => {
  return currentTime >= day && currentTime <= addDays(day, 1)
})

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
