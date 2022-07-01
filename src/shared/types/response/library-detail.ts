export interface ILibraryDetailResponse {
  code: number
  msg: string
  data: ILibraryDetailData[]
}

export interface ILibraryDetailData {
  bookIndex: string
  barcodeNumber: string
  pubYear: string
  collectionPlace: string
  bookState: string
}
