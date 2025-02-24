'use client'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import {
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
  Receipt1,
  ReceiptMinus,
} from 'iconsax-react'
import Image from 'next/image'
import React from 'react'
const Header: React.FC = () => {
  const { menu, setMenu } = useMenu()
  const { userInfo } = useData()
  const names: [string, string][] = [
    ['داشبورد', ''],
    ['کیف پول', 'wallet'],
    ['مدیریت پورسانت‌‌ دهی', 'porsant'],
    ['کمپین', 'campaign'],
    ['پروموشن', 'promotion'],
    ['گزارش مالی', 'finance-report'],
    ['گزارش تراکنش‌ها', 'transactions-reports'],
    ['گروه', 'mygroups'],
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
    Receipt1,
    ReceiptMinus,
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
      className={
        'flex w-full justify-between items-center p-4 bg-white rounded-md'
      }>
      <div className='flex gap-1'>
        {Icons[names.findIndex(([, link]) => link === menu)] &&
          React.createElement(
            Icons[names.findIndex(([, link]) => link === menu)]
          )}
        <h3>{names.find(([, link]) => link === menu)?.[0] || ''}</h3>
      </div>

      <div className={'flex gap-5 items-center'}>
        <Notification color='#50545F' size={24} />
        <div className={''}>{userInfo?.full_name}</div>
        <div
          className='flex items-center relative'
          onClick={() => {
            setMenu('profile')
          }}>
          <Image
            src={'/icons/logo.png'}
            alt='پروفایل کاربر'
            width={48}
            height={48}
            className='w-[6vh] h-[6vh] object-cover rounded-full cursor-pointer'
          />
          <div className='absolute bottom-[0.5vh] right-[0.5vh] w-[1.5vh] h-[1.5vh] bg-[#0F973D] rounded-full'></div>
        </div>
      </div>
    </div>
  )
}

export default Header
