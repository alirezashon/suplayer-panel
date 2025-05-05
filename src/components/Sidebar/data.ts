export interface SubItem {
  name: string
  link: string[]
  iconIndex?: number
  code: string
  subItems?: SubItem[]
}

export interface Items {
  name: string
  link: string[]
  iconIndex?: number
  code: string
  subItems?: SubItem[]
}

export const data: Items[] = [
  {
    name: 'داشبورد',
    link: ['dashboard'],
    code: '65',
    iconIndex: 0,
  },
  {
    name: 'کیف پول',
    link: ['wallet', 'deposite', 'deposite-draft'],
    code: '115',
    iconIndex: 1,
  },
  {
    name: ' مدیریت پورسانت‌ دهی',
    link: [
      'porsant',
      'porsantmanagement',
      'groupsdetail',
      'allocation',
      'release',
      'reports',
    ],
    code: '83',
    iconIndex: 2,
  },
  {
    name: ' کمپین',
    link: ['campaign', 'campaign-list', 'view-campaign'],
    code: '78',
    iconIndex: 3,
  },
  {
    name: ' پروموشن',
    link: [
      'promotion',
      'promotion-list',
      'new-promotion',
      'edit-promotion',
      'view-promotion',
      'promotion-view',
    ],
    code: '77',
    iconIndex: 4,
  },
  {
    name: 'گزارشات',
    link: ['finance-report', 'transactions-reports'],
    code: '76',
    iconIndex: 14,
    subItems: [
      {
        name: 'گزارش مالی',
        link: ['finance-report'],
        code: '76',
        iconIndex: 15,
      },
      {
        name: 'گزارش تراکنش ها',
        link: ['transactions-reports'],
        code: '75',
        iconIndex: 16,
      },
    ],
  },
  {
    name: ' تعاریف',
    link: [
      'mygroups',
      'subgroups',
      'referrers',
      'beneficiary',
      'productgroups',
      'product-brands',
    ],
    code: '74',
    iconIndex: 5,
    subItems: [
      {
        name: 'گروه‌های من',
        link: ['mygroups'],
        code: '74',
        iconIndex: 6,
      },
      {
        name: 'زیر گروه‌های من',
        link: ['subgroups'],
        code: '73',
        iconIndex: 7,
      },
      {
        name: 'بازاریاب‌های من',
        link: ['referrers'],
        code: '72',
        iconIndex: 8,
      },
      {
        name: '  ذی‌نفع‌های من',
        link: ['beneficiary'],
        code: '71',
        iconIndex: 9,
      },
      {
        name: 'محصولات من',
        link: ['productgroups', 'product-brands', 'products'],
        code: '70',
        iconIndex: 10,
      },
    ],
  },
  {
    name: ' تنظیمات',
    link: ['referral-levels', 'variablels'],
    code: '69',
    iconIndex: 11,
    subItems: [
      {
        name: 'تعریف چارت سازمانی',
        link: ['referral-levels'],
        code: '69',
        iconIndex: 12,
      },
      {
        name: 'تعریف متغیرها',
        link: ['variablels'],
        code: '68',
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
  // { name: '۰۲۱-۹۲۳۰۰۸۴۲', link: '/reports/expenses', iconIndex: 15 },
  // {
  //   name: 'پاسخگویی تلفنی ۸ صبح الی ۱۲ شب',
  //   link: '/reports/expenses',
  // },
]
