export interface SubItem {
  name: string
  link: string
  iconIndex?: number
  subItems?: SubItem[]
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
    link: 'dashboard',
    iconIndex: 0,
  },
  {
    name: 'کیف پول',
    link: 'wallet',
    iconIndex: 1,
  },

  {
    name: ' مدیریت پورسانت‌ دهی',
    link: 'porsant',
    iconIndex: 2,
  },
  {
    name: ' کمپین',
    link: 'campaign',
    iconIndex: 3,
  },
  {
    name: ' پروموشن',
    link: 'promotion',
    iconIndex: 4,
  },
  {
    name: ' تعاریف',
    link: 'mygroups',
    iconIndex: 5,
    subItems: [
      {
        name: 'گروه‌های من',
        link: 'mygroups',
        iconIndex: 6,
      },
      {
        name: 'زیر گروه‌های من',
        link: 'subgroups',
        iconIndex: 7,
      },
      {
        name: 'بازاریاب‌های من',
        link: 'referrers',
        iconIndex: 8,
      },
      {
        name: '  ذی‌نفع‌های من',
        link: 'beneficiary',
        iconIndex: 9,
      },
      {
        name: 'محصولات من',
        link: 'productgroups',
        iconIndex: 10,
      },
    ],
  },
  {
    name: ' تنظیمات',
    link: 'referral-levels',
    iconIndex: 11,
    subItems: [
      {
        name: 'تعریف چارت سازمانی',
        link: 'referral-levels',
        iconIndex: 12,
      },
      {
        name: 'تعریف متغیرها',
        link: 'variablels',
        iconIndex: 13,
      },
      //      {
      //   name: 'مدیریت شاخص‌ها',
      //   link: 'referral-levels',
      //   iconIndex: 13,
      //   subItems: [

      //     // {
      //     //   name: '',
      //     //   link: 'referral-levels',
      //     //   iconIndex: 12,
      //     // },
      //   ],
      // },
    ],
  },
  // {
  //   name: ' پشتیلانی آنلاین',
  //   link: '/reports',
  //   iconIndex: 12,
  //   subItems: [
  //     {
  //       name: ' تیکتینگ',
  //       link: '/wallet/add',
  //       iconIndex: 13,
  //     },
  //     {
  //       name: ' چت آنلاین',
  //       link: '/wallet/add',
  //       iconIndex: 14,
  //     },
  //   ],
  // },
  { name: '۰۲۱-۹۲۳۰۰۸۴۲', link: '/reports/expenses', iconIndex: 15 },
  {
    name: 'پاسخگویی تلفنی ۸ صبح الی ۱۲ شب',
    link: '/reports/expenses',
  },
]
