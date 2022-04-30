export interface Lessons {
  id: number
  nameZh: string
  nameEn: any
  code: string
  remark?: string
  requiredPeriodInfo: RequiredPeriodInfo
  actualPeriods: number
  scheduleText: ScheduleText
  stdCount: number
  limitCount: number
  reserveCount: number
  suggestScheduleWeeks: number[]
  calcRelatedAdminclasses: boolean
  allowMakeup: boolean
  expActualPeriods: number
  needAssign: boolean
  auto: boolean
  scheduleRemark: any
  timeTableLayout: TimeTableLayout
  bizType: BizType
  semester: Semester
  course: Course
  preCourses: any[]
  courseType: CourseType
  openDepartment: OpenDepartment
  examMode: ExamMode
  campus: Campus
  teachLang: any
  roomType?: RoomType
  suggestScheduleWeeksInfo: string
  scheduleWeeksInfo?: string
  teacherAssignmentList: TeacherAssignmentList[]
  courseLevelRequireList: any[]
  scheduleStartWeek?: number
  scheduleEndWeek?: number
  planExamWeek?: number
  adminclassIds: number[]
  scheduleCurrentWeek?: number
  scheduleChangeWeeks: number[]
  courseExt: CourseExt
  selectionLimitGrade: string
  selectionLimitDepart: string
  selectionLimitMajor: string
  teacherAssignmentName: string[]
  textbookName: string
}

export interface RequiredPeriodInfo {
  total: number
  weeks: number
  theory?: number
  theoryUnit?: string
  requireTheory?: number
  practice?: number
  practiceUnit?: string
  requirePractice?: number
  test: any
  testUnit: any
  requireTest: any
  experiment?: number
  experimentUnit?: string
  requireExperiment?: number
  machine?: number
  machineUnit?: string
  requireMachine?: number
  design: any
  designUnit: any
  requireDesign: any
  periodsPerWeek: number
}

export interface ScheduleText {
  dateTimeText: DateTimeText
  dateTimePlaceText: DateTimePlaceText
  dateTimePlacePersonText: DateTimePlacePersonText
}

export interface DateTimeText {
  textZh?: string
  textEn?: string
  text?: string
}

export interface DateTimePlaceText {
  textZh?: string
  textEn?: string
  text?: string
}

export interface DateTimePlacePersonText {
  textZh?: string
  textEn?: string
  text?: string
}

export interface TimeTableLayout {
  id: number
  nameZh: string
  nameEn: string
  enabled: boolean
}

export interface BizType {
  id: number
  nameZh: string
  nameEn: string
}

export interface Semester {
  id: number
  nameZh: string
  nameEn: string
  code: string
  calendar: Calendar
  schoolYear: string
  startDate: string
  endDate: string
  weekStartOnSunday: boolean
  countInTerm: boolean
  season: string
  enabled: boolean
  fileInfo: any
}

export interface Calendar {
  id: number
  nameZh: string
  nameEn: string
}

export interface Course {
  id: number
  nameZh: string
  nameEn: string
  code: string
  periodInfo: PeriodInfo
  stageInfo: StageInfo
  credits: number
  calculateGp: boolean
  theory: boolean
  experiment: boolean
  practice: boolean
  test: boolean
  machine: boolean
  design: boolean
  enabled: boolean
}

export interface PeriodInfo {
  total: number
  weeks: number
  theory?: number
  theoryUnit?: string
  requireTheory?: number
  practice?: number
  practiceUnit?: string
  requirePractice: any
  test: any
  testUnit: any
  requireTest: any
  experiment?: number
  experimentUnit?: string
  requireExperiment?: number
  machine?: number
  machineUnit?: string
  requireMachine?: number
  design: any
  designUnit?: string
  requireDesign: any
  periodsPerWeek: number
}

export interface StageInfo {
  stage: boolean
  stageNum: any
  stageGrantNum: any
}

export interface CourseType {
  nameZh: string
  nameEn?: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface OpenDepartment {
  id: number
  nameZh: string
  nameEn?: string
  code: string
  abbrZh: string
  abbrEn?: string
  college: boolean
  openCourse: boolean
  experiment: boolean
}

export interface ExamMode {
  nameZh: string
  nameEn?: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface Campus {
  id: number
  nameZh: string
  nameEn: string
  code: string
}

export interface RoomType {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface TeacherAssignmentList {
  teacher: Teacher
  person: Person2
  role: string
  indexNo: number
  age?: number
}

export interface Teacher {
  id: number
  code: string
  teaching: boolean
  zaiZhi: boolean
  hireType: string
  department: Department
  person: Person
  title?: Title
  type?: Type
  titleMaintained: boolean
  titleMaintainDateTime?: string
}

export interface Department {
  id: number
  nameZh: string
  nameEn?: string
  code: string
  abbrZh?: string
  abbrEn?: string
  college: boolean
  openCourse: boolean
  experiment: boolean
}

export interface Person {
  id: number
  nameZh: string
  nameEn?: string
}

export interface Title {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface Type {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface Person2 {
  id: number
  nameZh: string
  nameEn?: string
}

export interface CourseExt {
  id: number
  nameZh: string
  nameEn: string
  code: string
  periodInfo: PeriodInfo2
  stageInfo: StageInfo2
  credits: number
  calculateGp: boolean
  theory: boolean
  experiment: boolean
  practice: boolean
  test: boolean
  machine: boolean
  design: boolean
  enabled: boolean
  education: Education
  courseType: CourseType2
  defaultOpenDepart: DefaultOpenDepart
  grantCourseLevel: any
  defaultExamMode: DefaultExamMode
  defaultPreCourses: any[]
  belongBizType: BelongBizType
  suitableBizTypes: SuitableBizType[]
  mngtDepartment: MngtDepartment
  teachLang: any
  courseNature?: CourseNature
  courseCategory: CourseCategory
  extraCredits?: number
  remark?: string
  extraCourse: boolean
  chargeTeacher?: ChargeTeacher
  openMajor?: OpenMajor
  workloadTypes: WorkloadType[]
  courseCharacters?: CourseCharacter[]
  teachType?: string
  teachingMethod?: TeachingMethod
}

export interface PeriodInfo2 {
  total: number
  weeks: number
  theory?: number
  theoryUnit?: string
  requireTheory?: number
  practice?: number
  practiceUnit?: string
  requirePractice: any
  test: any
  testUnit: any
  requireTest: any
  experiment?: number
  experimentUnit?: string
  requireExperiment?: number
  machine?: number
  machineUnit?: string
  requireMachine?: number
  design: any
  designUnit?: string
  requireDesign: any
  periodsPerWeek: number
  extraCourse?: number
  extraCourseUnit?: string
  requireExtraCourse?: number
}

export interface StageInfo2 {
  stage: boolean
  stageNum: any
  stageGrantNum: any
}

export interface Education {
  nameZh: string
  nameEn: any
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface CourseType2 {
  nameZh: string
  nameEn?: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface DefaultOpenDepart {
  id: number
  nameZh: string
  nameEn?: string
  code: string
  abbrZh: string
  abbrEn?: string
  college: boolean
  openCourse: boolean
  experiment: boolean
}

export interface DefaultExamMode {
  nameZh: string
  nameEn?: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface BelongBizType {
  id: number
  nameZh: string
  nameEn: string
}

export interface SuitableBizType {
  id: number
  nameZh: string
  nameEn: string
}

export interface MngtDepartment {
  id: number
  nameZh: string
  nameEn?: string
  code: string
  abbrZh: string
  abbrEn?: string
  college: boolean
  openCourse: boolean
  experiment: boolean
}

export interface CourseNature {
  nameZh: string
  nameEn: any
  id: number
  code: string
  remark: any
  enabled: boolean
  autoCalcPeriod: boolean
  unitPeriod?: number
  transient: boolean
  name: string
}

export interface CourseCategory {
  nameZh: string
  nameEn?: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface ChargeTeacher {
  id: number
  code: string
  teaching: boolean
  zaiZhi: boolean
  hireType: string
  department: Department2
  person: Person3
  title?: Title2
  type?: Type2
  titleMaintained: boolean
  titleMaintainDateTime?: string
}

export interface Department2 {
  id: number
  nameZh: string
  nameEn?: string
  code: string
  abbrZh?: string
  abbrEn?: string
  college: boolean
  openCourse: boolean
  experiment: boolean
}

export interface Person3 {
  id: number
  nameZh: string
  nameEn?: string
}

export interface Title2 {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface Type2 {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface OpenMajor {
  id: number
  nameZh: string
  nameEn: string
  code: string
  abbrZh: string
  abbrEn: any
  majorType: string
  parent: boolean
  parentMajorAssocs: any[]
  childMajorAssocs: any[]
}

export interface WorkloadType {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface CourseCharacter {
  nameZh: string
  nameEn: any
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}

export interface TeachingMethod {
  nameZh: string
  nameEn: string
  id: number
  code: string
  enabled: boolean
  bizTypeAssocs: number[]
  bizTypeIds: number[]
  transient: boolean
  name: string
}
