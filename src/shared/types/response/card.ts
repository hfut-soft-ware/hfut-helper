import { createResponseData } from '@/shared/utils/createResponseData'

export interface ICardBaseInfoResponse {
  data: ICardBaseInfo
}

export interface ICardBaseInfo {
  balance: string
  cardStatus: boolean
  freeze: boolean
  loss: boolean
}

export const cardDefaultValue = createResponseData<ICardBaseInfo>({
  balance: '¥¥',
  cardStatus: true,
  freeze: false,
  loss: false,
})
