export interface SchoolList {
  defaultSchoolId: number
  defaultSchoolName: string
  totalCount: number
  schools: School[]
}

export interface School {
  id: number
  name: string
}
