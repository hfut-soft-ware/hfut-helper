type Service = {
  icon: string
  title: string
  url: string
  isAppIdUrl?: boolean
}

export const servicesList: Service[] = [
  {
    icon: 'flyship',
    title: '全校课表',
    url: 'course-search/course-search',
  },
  {
    icon: 'telescope',
    title: '挂科率',
    url: 'failureRate/failureRate',
  },
  {
    icon: 'galaxy',
    title: '我的慕课',
    url: 'mooc/mooc',
  },
  {
    icon: 'detour',
    title: '培养方案',
    url: 'train-plan/train-plan',
  },
  {
    icon: 'rocket-2',
    title: '图书馆藏',
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
    icon: 'calendar',
    title: '校历',
    url: 'school-calendar/school-calendar',
  },
  {
    icon: 'bus',
    title: '校车查询',
    url: 'school-bus/school-bus',
  },
  {
    icon: 'ipad',
    title: '第二课堂',
    url: 'wx1e3feaf804330562',
    isAppIdUrl: true,
  },
  {
    icon: 'search-room',
    title: '空教室',
    url: 'empty-classroom/empty-classroom',
  },
  {
    icon: 'help',
    title: '帮助',
    url: 'help/help',
  },
]
