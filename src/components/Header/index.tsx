'use client'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import {
  Message,
  Notification,
  Menu,
  MenuBoard,
  Profile2User,
  Money4,
  StatusUp,
  People,
  PresentionChart,
  Call,
  Ticket,
  MessageNotif,
  Strongbox2,
  Profile,
  User,
  Box,
  Setting2,
  Chart,
} from 'iconsax-react'
import React from 'react'
const Header: React.FC = () => {
  const { menu } = useMenu()
  const { userInfo } = useData()
  const names: [string, string][] = [
    ['داشبورد', ''],
    ['کیف پول', 'wallet'],
    ['مدیریت پورسانت‌‌ دهی', 'porsant'],
    ['کمپین', 'campaign'],
    ['پروموشن', 'promotion'],
    ['گروه', 'groupmanagement'],
    ['گروه‌های من', 'mygroups'],
    ['زیرگروه', 'subgroups'],
    ['بازاریاب‌های من', 'referrers'],
    ['ذی‌نفع‌های من', 'beneficiary'],
    ['محصولات من', 'productgroups'],
    ['آزادسازی', 'wallet/ad'],
    ['تعاریف', 'definitions'],
    ['پروفایل ', 'profile'],
  ]
  const Icons = [
    Menu,
    Strongbox2,
    Money4,
    StatusUp,
    PresentionChart,
    MenuBoard,
    People,
    Profile2User,
    Profile,
    User,
    Box,
    Setting2,
    Chart,
    Ticket,
    MessageNotif,
    Call,
  ]

  return (
    <div
      className={'flex w-full justify-between items-center mb-4 p-5 bg-white '}>
      <div className='flex gap-1'>
        {Icons[names.findIndex(([, link]) => link === menu)] &&
          React.createElement(
            Icons[names.findIndex(([, link]) => link === menu)]
          )}
        <h3>{names.find(([, link]) => link === menu)?.[0] || ''}</h3>
      </div>

      <div className={'flex gap-5'}>
        <Notification color='#50545F' size={24} />
        <Message color='#50545F' size={24} />
        <div className={''}>{userInfo?.full_name}</div>
        <Profile color='#50545F' size={24} />
      </div>
    </div>
  )
}

export default Header
