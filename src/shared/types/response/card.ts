import { createResponseData } from '@/shared/utils/createResponseData'

export interface ICardBaseInfo {
  data: {
    balance: string
    cardStatus: boolean
    freeze: boolean
    loss: boolean
  }
}

export const cardDefaultValue = createResponseData<ICardBaseInfo>({
  data: {
    balance: '¥¥',
    cardStatus: true,
    freeze: false,
    loss: false,
  },
})
