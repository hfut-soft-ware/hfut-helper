import { getUserData } from '@/store/auth.store'
import { dayHours as hours } from '@/shared/constant'

export function useDayHours() {
  const userData = getUserData() as any | ''
  const dayHours = [...hours]
  if (userData && userData.campus === '翡翠湖校区') {
    dayHours[0].start = '08:10'
    dayHours[2].start = '12:10'
  }
  return {
    dayHours,
  }
}
