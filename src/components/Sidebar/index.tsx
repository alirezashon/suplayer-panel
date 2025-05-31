'use client'
import { useState } from 'react'
import { data } from './data'
import {
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
  ArrowDown2,
  LogoutCurve,
  Strongbox2,
  Profile,
  User,
  Box,
  ArrowSquareRight,
  Chart,
  Setting2,
  Blend,
  TransactionMinus,
  ReceiptMinus,
  Receipt1,
} from 'iconsax-react'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { menu, setMenu } = useMenu()
  const { userInfo } = useData()
  const iconList = [
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
    Blend,
    TransactionMinus,
    Receipt1,
    ReceiptMinus,
    Ticket,
    MessageNotif,
    Call,
  ]

  const generateIcon = (iconIndex: number | undefined, color: string) => {
    if (
      iconIndex === undefined ||
      iconIndex < 0 ||
      iconIndex >= iconList.length
    )
      return null
    const IconComponent = iconList[iconIndex]
    return <IconComponent color={color} size={24} />
  }

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className={`fixed top-2 right-2 h-[98vh] rounded-md z-50 transition-all duration-700 ${
        isOpen ? 'min-w-[17%] max-lg:min-w-[39%] ' : 'w-[5%] max-lg:min-w-[7%]'
      } bg-white flex flex-col overflow-y-auto `}>
      <div
        className={`sticky top-0 ${
          isOpen ? 'justify-between' : 'justify-center'
        } flex items-center px-3 py-1 border-b border-[#C9D0D8] bg-white`}>
        {isOpen && (
          <div className='flex items-center gap-2'>
            <Image
              src={'/icons/logo.svg'}
              alt='logo'
              width={67}
              height={48}
              className=' object-contain mt-4'
            />
          </div>
        )}

        {isOpen ? (
          <ArrowSquareRight
            cursor={'pointer'}
            onClick={() => setIsOpen(!isOpen)}
            size={22}
            color='#50545F'
          />
        ) : (
          <Menu
            cursor={'pointer'}
            color='gray'
            size={24}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      {/* Menu Items */}
      <ul className='mt-[2vh]'>
        <p className={`${isOpen ? 'text-[#878FA4]' : 'hidden'}`}></p>
        {data.map((item, index) => (
          <li key={index} className='w-full my-3'>
            <div
              className={`flex items-center p-[1vh] rounded-md cursor-pointer ${
                index === 0 && !menu && 'bg-[#7747C0] text-white'
              } ${
                item.link.includes(menu)
                  ? 'bg-[#7747C0] text-white'
                  : 'text-[#242424]'
              }`}
              onClick={() => {
                setMenu(item.link[0])
                location.hash = item.link[0]
                setOpenIndex(openIndex === index ? null : index)
              }}>
              <p
                className={`flex justify-center   ${
                  isOpen ? 'ml-2' : 'w-full'
                }`}>
                {generateIcon(
                  item.iconIndex,
                  item.link.includes(menu) ? 'white' : '#50545F'
                )}
              </p>
              {isOpen && (
                <span className='ml-[1vw] flex-grow'>{item.name}</span>
              )}
              {item.subItems && isOpen && (
                <ArrowDown2
                  size={24}
                  color={item.link.includes(menu) ? 'white' : '#50545F'}
                  className={`transition-transform ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              )}
            </div>
            {/* Sub Menu */}
            {item.subItems && openIndex === index && isOpen && (
              <ul className='mr-2'>
                {item.subItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className='flex items-center p-[1vh] cursor-pointer'
                    onClick={() => {
                      location.hash = subItem.link[0]
                      setMenu(subItem.link[0])
                    }}>
                    {generateIcon(
                      subItem.iconIndex,
                      subItem.link.includes(menu) ? '#7747C0' : '#50545F'
                    )}
                    <span
                      className={`mr-1 ${
                        subItem.link.includes(menu)
                          ? 'text-[#7747C0] border-b border-purple-400'
                          : 'text-[#50545F]'
                      }`}>
                      {subItem.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* User Section */}
      <div className='mt-auto flex items-center justify-around p-[1vh]'>
        <div
          className='flex items-center relative'
          onClick={() => {
            setMenu('profile')
          }}>
          <Image
            src={'/icons/logo.svg'}
            alt='پروفایل کاربر'
            width={48}
            height={48}
            className='w-[6vh] h-[6vh] object-contain rounded-full cursor-pointer'
          />
          <div className='absolute bottom-[0.5vh] right-[0.5vh] w-[1.5vh] h-[1.5vh] bg-[#0F973D] rounded-full'></div>
        </div>
        {isOpen && <span className='ml-2'>{userInfo?.full_name}</span>}
        <LogoutCurve
          color='#50545F'
          size={24}
          cursor={'pointer'}
          onClick={() => (location.href = '/auth/login')}
        />
      </div>
    </div>
  )
}

export default Sidebar
