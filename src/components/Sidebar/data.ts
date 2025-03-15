export interface SubItem {
  name: string
  link: string[]
  iconIndex?: number
  subItems?: SubItem[]
}

export interface Items {
  name: string
  link: string[]
  iconIndex?: number
  subItems?: SubItem[]
}

export const data: Items[] = [
  {
    name: 'داشبورد',
    link: ['dashboard'],
    iconIndex: 0,
  },
  {
    name: 'کیف پول',
    link: ['wallet','deposite','deposite-draft'],
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
    iconIndex: 2,
  },
  {
    name: ' کمپین',
    link: ['campaign', 'campaign-list', 'view-campaign'],
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
    iconIndex: 4,
  },
  {
    name: 'گزارشات',
    link: ['finance-report', 'transactions-reports'],
    iconIndex: 14,
    subItems: [
      {
        name: 'گزارش مالی',
        link: ['finance-report'],
        iconIndex: 15,
      },
      {
        name: 'گزارش تراکنش ها',
        link: ['transactions-reports'],
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
    iconIndex: 5,
    subItems: [
      {
        name: 'گروه‌های من',
        link: ['mygroups'],
        iconIndex: 6,
      },
      {
        name: 'زیر گروه‌های من',
        link: ['subgroups'],
        iconIndex: 7,
      },
      {
        name: 'بازاریاب‌های من',
        link: ['referrers'],
        iconIndex: 8,
      },
      {
        name: '  ذی‌نفع‌های من',
        link: ['beneficiary'],
        iconIndex: 9,
      },
      {
        name: 'محصولات من',
        link: ['productgroups', 'product-brands','products'],
        iconIndex: 10,
      },
    ],
  },
  {
    name: ' تنظیمات',
    link: ['referral-levels', 'variablels'],
    iconIndex: 11,
    subItems: [
      {
        name: 'تعریف چارت سازمانی',
        link: ['referral-levels'],
        iconIndex: 12,
      },
      {
        name: 'تعریف متغیرها',
        link: ['variablels'],
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
