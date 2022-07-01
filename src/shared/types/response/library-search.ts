export interface ILibrarySearchResponse {
  code: number
  msg: string
  data: ILibrarySearchData[]
}

export interface ILibrarySearchData {
  author: string
  callNo: string
  docTypeName: string
  isbn: string
  marcRecNo: string
  num: number
  pubYear: string
  publisher: string
  sourceMarcRecNo: string
  title: string
}
