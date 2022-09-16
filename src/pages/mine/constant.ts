type Service = {
  icon: string
  title: string
  url: string
  isAppIdUrl?: boolean
}

export const servicesList: Service[] = [
  {
    icon: 'flyship',
    title: '全校课表查询',
    url: 'course-search/course-search',
  },
  {
    icon: 'telescope',
    title: '挂科率查询',
    url: 'failureRate/failureRate',
  },
  {
    icon: 'galaxy',
    title: '我的慕课(包含部分选修课)',
    url: 'mooc/mooc',
  },
  {
    icon: 'detour',
    title: '培养方案',
    url: 'train-plan/train-plan',
  },
  {
    icon: 'rocket-2',
    title: '图书馆馆藏查询',
    url: 'library/library',
  },
  {
    icon: 'satellite-orbit',
    title: '本学期课表',
    url: 'semester-course/semester-course',
  },
  {
    icon: 'astronaut',
    title: '关于我们',
    url: 'about/about',
  },
  // {
  //   icon: 'star-moon',
  //   title: '空教室查询',
  //   url: 'emptyRoomSearch',
  // },
]

export const servicesButtonList: Service[] = [
  {
    icon: 'notes-o',
    title: '校历',
    url: 'school-calendar/school-calendar',
  },
  {
    icon: 'logistics',
    title: '校车查询',
    url: 'school-bus/school-bus',
  },
  {
    icon: 'todo-list-o',
    title: '第二课堂',
    url: 'wx1e3feaf804330562',
    isAppIdUrl: true,
  },
  {
    icon: 'debit-pay',
    title: '教室查询',
    url: 'empty-classroom/empty-classroom',
  },
  {
    icon: 'flag-o',
    title: '帮助',
    url: 'help/help',
  },
]
