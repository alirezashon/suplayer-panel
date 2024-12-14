export interface SubItem {
  name: string
  link: string
  iconIndex?: number
}

export interface Items {
  name: string
  link: string
  iconIndex?: number
  subItems?: SubItem[]
}

export const data: Items[] = [
  {
    name: 'داشبورد',
    link: '/dashboard',
    iconIndex: 0,
  },
  {
    name: 'کیف پول',
    link: '/wallet',
    iconIndex: 1,
    subItems: [],
  },
  { name: 'کیف پول ویزیت', link: '/wallet/add', iconIndex: 2, subItems: [] },
  {
    name: 'کیف پول درگاه سلامت',
    link: '/wallet/add',
    iconIndex: 2,
    subItems: [
      { name: 'افزایش موجودی', link: '/wallet/add', iconIndex: 3 },
      { name: 'تبدیل', link: '/wallet/swap', iconIndex: 4 },
      { name: 'برداشت', link: '/wallet/withdraw', iconIndex: 5 },
    ],
  },
  {
    name: 'پشتیبانی آنلاین',
    link: '/reports',
    iconIndex: 6,
    subItems: [],
  },
  { name: '۰۲۱-۹۲۳۰۰۸۴۲', link: '/reports/expenses', iconIndex: 7 },
  {
    name: 'پاسخگویی تلفنی ۸ صبح الی ۱۲ شب',
    link: '/reports/expenses',
  },
]
