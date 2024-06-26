export type WeekDays = {
  weekday: string
  day: string
  date: Date
  active: boolean
  idx: number
}[]

export type RankMode = 'major' | 'class' | 'school'

export type Tab = {
  key: RankMode
  name: string
}
