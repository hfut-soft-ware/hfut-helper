export interface ILoginResponse {
  code: number
  msg: string
  data: {
    token: string
    sign: string
  }
}
