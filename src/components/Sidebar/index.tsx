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
} from 'iconsax-react'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'

const user = {
  name: 'محدثه عالمی',
  src: '/icons/logo.svg',
}

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { menu, setMenu } = useMenu()

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
      className={`fixed top-0 right-0 h-full transition-all duration-300 ${
        isOpen ? 'min-w-[17%]' : 'w-[5%]'
      } bg-white flex flex-col overflow-y-auto border border-[#C9D0D8]`}>
      <div className='sticky top-0 justify-center flex items-center border-b border-[#C9D0D8] bg-white'>
        {isOpen && (
          <Image
            src={'/icons/logo.svg'}
            alt='logo'
            width={200}
            height={100}
            className='w-[80%] h-[7vh] object-contain mt-4'
          />
        )}
        
        {isOpen ?  <ArrowSquareRight
          onClick={() => setIsOpen(!isOpen)}
          size={22}
          color='#50545F'
        />: <Menu color='gray' size={24} 
        onClick={() => setIsOpen(!isOpen)}
        />}
      </div>

      {/* Menu Items */}
      <ul className='mt-[2vh]'>
        <p className={`${isOpen ? 'text-[#878FA4]' : 'hidden'}`}>منو اصلی</p>
        {data.map((item, index) => (
          <li key={index} className='w-full my-3'>
            <div
              className={`flex items-center p-[1vh] rounded-md cursor-pointer ${
                openIndex === index
                  ? 'bg-[#7747C0] text-white'
                  : 'text-[#242424]'
              }`}
              onClick={() => {
                setMenu(item.link)
                location.hash = item.link
                setOpenIndex(openIndex === index ? null : index)
              }}>
              {generateIcon(
                item.iconIndex,
                openIndex === index ? 'white' : '#50545F'
              )}
              {isOpen && (
                <span className='ml-[1vw] flex-grow'>{item.name}</span>
              )}
              {item.subItems && isOpen && (
                <ArrowDown2
                  size={24}
                  color={openIndex === index ? 'white' : '#50545F'}
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
                      location.hash = subItem.link
                      setMenu(subItem.link)
                    }}>
                    {generateIcon(
                      subItem.iconIndex,
                      menu === subItem.link ? '#7747C0' : '#50545F'
                    )}
                    <span
                      className={`mr-1 ${
                        menu === subItem.link
                          ? 'text-[#7747C0]'
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
            src={user.src}
            alt='پروفایل کاربر'
            width={48}
            height={48}
            className='w-[6vh] h-[6vh] object-cover rounded-full cursor-pointer'
          />
          <div className='absolute bottom-[0.5vh] right-[0.5vh] w-[1.5vh] h-[1.5vh] bg-[#0F973D] rounded-full'></div>
        </div>
        {isOpen && <span className='ml-2'>{user.name}</span>}
        <LogoutCurve color='#50545F' size={24} />
      </div>
    </div>
  )
}

export default Sidebar
