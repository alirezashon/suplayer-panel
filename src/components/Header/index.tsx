'use client'
import { useMenu } from '@/Context/Menu'
import { Message, Notification, Profile } from 'iconsax-react'
import { data } from '../Sidebar/data'
const Header: React.FC = () => {
  const { menu } = useMenu()
  const names: [string, string][] = [
    ['داشبورد', ''],
    ['کیف پول', 'wallet'],
    ['تسویه حساب', 'walletadd'],
    ['آزادسازی', 'wallet/ad'],
    ['تعاریف', 'definitions'],
    ['گروه', 'groupmanagement'],
    ['زیرگروه', 'subgroups'],
    ['محصولات من', 'productgroups'],
    ['بازاریاب‌های من', 'referrers'],
    ['گروه‌های من', 'mygroups'],
    ['پروموشن', '/reports'],
    ['تعریف پروموشن', '/wallet/add'],
    ['فعال‌سازی', '/wallet/add'],
    ['پشتیلانی آنلاین', '/reports'],
    ['تیکتینگ', '/wallet/add'],
    ['چت آنلاین', '/wallet/add'],
    ['۰۲۱-۹۲۳۰۰۸۴۲', '/reports/expenses'],
    ['پاسخگویی تلفنی ۸ صبح الی ۱۲ شب', '/reports/expenses'],
  ]

  const user = 'پارس حیان'
  return (
    <div
      className={'flex w-full justify-between items-center mb-4 p-5 bg-white '}>
      <h3>{names.find(([_, link]) => link === menu)?.[0] || ''}</h3>
      <div className={'flex gap-5'}>
        <Notification color='#50545F' size={24} />
        <Message color='#50545F' size={24} />
        <div className={''}>{user}</div>
        <Profile color='#50545F' size={24} />
      </div>
    </div>
  )
}

export default Header
