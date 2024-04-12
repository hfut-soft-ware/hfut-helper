export type Noop = () => void

export type Series = {
  name: string
  data: any[]
  legendShape?: 'circle' | 'none'
  pointShape?: 'circle' | 'none'
  format?: string
}

export type Include<T, U extends keyof T> = U

export type HelpType = 'common' | 'login' | 'score' | 'course' | 'grammar'

export interface ResponseData<T> {
  code: number
  msg: string
  data: T
}
