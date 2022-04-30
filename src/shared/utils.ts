export const getTeacherName = (teachers: { person: { name: string; nameZh: string; id: number } }[]): string => {
  return teachers.map((teacher) => {
    return teacher.person.nameZh
  }).join('/')
}

export const existProperty = (obj: any): boolean => obj && Object.keys(obj).length > 0
