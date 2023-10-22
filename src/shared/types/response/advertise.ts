export interface IAdvertiseResponse {
  code: number
  msg: string
  data: {
    campusName: string
    campusCode: string
    advertiseUrl: string
    redirectUri: string
    backgroundColor: string
  }
}
