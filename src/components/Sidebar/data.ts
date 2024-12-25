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
    link: '',
    iconIndex: 0,
  },
  {
    name: 'کیف پول',
    link: 'wallet',
    iconIndex: 1,
  },
  {
    name: 'تسویه حساب',
    link: 'walletadd',
    iconIndex: 2,
    subItems: [
      {
        name: '   آزادسازی',
        link: 'wallet/ad',
        iconIndex: 3,
      },
    ],
  },
  {
    name: ' تعاریف',
    link: 'groupmanagement',
    iconIndex: 4,
    subItems: [
      {
        name: 'گروه',
        link: 'groupmanagement',
        iconIndex: 5,
      },
      {
        name: 'زیرگروه',
        link: 'subgroups',
        iconIndex: 5,
      },
      {
        name: 'محصولات من',
        link: 'productgroups',
        iconIndex: 6,
      },
      {
        name: 'بازاریاب‌های من',
        link: 'referrers',
        iconIndex: 7,
      },
    ],
  },
  {
    name: 'گروه‌های من ',
    link: 'mygroups',
    iconIndex: 8,
  },
  {
    name: ' پروموشن',
    link: '/reports',
    iconIndex: 9,
    subItems: [
      {
        name: 'تعریف پروموشن',
        link: '/wallet/add',
        iconIndex: 10,
      },
      {
        name: ' فعال‌سازی',
        link: '/wallet/add',
        iconIndex: 11,
      },
    ],
  },
  {
    name: ' کمپین',
    link: 'campaign',
    iconIndex: 9,
  },
  {
    name: ' پشتیلانی آنلاین',
    link: '/reports',
    iconIndex: 12,
    subItems: [
      {
        name: ' تیکتینگ',
        link: '/wallet/add',
        iconIndex: 13,
      },
      {
        name: ' چت آنلاین',
        link: '/wallet/add',
        iconIndex: 14,
      },
    ],
  },
  { name: '۰۲۱-۹۲۳۰۰۸۴۲', link: '/reports/expenses', iconIndex: 15 },
  {
    name: 'پاسخگویی تلفنی ۸ صبح الی ۱۲ شب',
    link: '/reports/expenses',
  },
]
