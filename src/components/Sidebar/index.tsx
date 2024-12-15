'use client'
import { useState } from 'react'
import { data } from './data'
import styles from './index.module.css'
import {
  Menu,
  MenuBoard,
  Profile2User,
  Receipt1,
  Add,
  People,
  MoneySend,
  Box1,
  UserAdd,
  PresentionChart,
  FavoriteChart,
  ChartSuccess,
  Call,
  MessageFavorite,
  Ticket,
  MessageNotif,
  ArrowDown2,
  LogoutCurve,
  Strongbox2,
} from 'iconsax-react'
import Image from 'next/image'
const user = {
  name: 'محدثه عالمی',
  src: '/images/2.png',
}
const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const iconList = [
    Menu,
    Strongbox2,
    Receipt1,
    MoneySend,
    MenuBoard,
    People,
    UserAdd,
    Box1,
    Profile2User,
    PresentionChart,
    FavoriteChart,
    ChartSuccess,
    MessageFavorite,
    Ticket,
    MessageNotif,
    Call,
  ]

  const generateIcon = (iconIndex: number | undefined, color: string) => {
    if (
      iconIndex === undefined ||
      iconIndex < 0 ||
      iconIndex >= iconList.length
    ) {
      return null
    }

    const IconComponent = iconList[iconIndex]
    return <IconComponent color={color} size={24} />
  }

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={`${styles.topSection} ${styles.bottomBorder}`}>
        {isOpen && (
          <Image
            src={'/icons/logo.svg'}
            alt='logo'
            width={200}
            height={100}
            className={styles.logo}
          />
        )}
        <div className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MenuBoard /> : <Menu color='gray' />}
        </div>
      </div>

      <ul className={styles.menu}>
        <p>منو اصلی</p>
        {data.map((item, index) => (
          <li
            key={index}
            className={`${styles.menuItem} ${
              openIndex === index && styles.bottomBorder
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {isOpen && index === 4 ? (
              <p>دسترسی سریع</p>
            ) : (
              isOpen && index === 5 && <p>پشتیبانی تلفنی</p>
            )}
            <div
              className={`${styles.itemHeader} ${
                openIndex === index ? styles.active : ''
              }`}>
              {generateIcon(
                item.iconIndex,
                openIndex === index ? 'white' : isOpen ? 'gray' : '#50545F'
              )}
              {isOpen && (
                <div
                  className={`${styles.link} ${
                    openIndex === index ? styles.active : ''
                  }`}>
                  {item.name}
                </div>
              )}
              {item.subItems && isOpen && (
                <div
                  style={{
                    transform: `rotate(${
                      openIndex === index ? '180' : '0'
                    }deg)`,
                    display: 'flex',
                  }}>
                  <ArrowDown2
                    color={openIndex === index ? 'white' : '#50545F'}
                  />
                </div>
              )}
            </div>
            {/* SUB ITEMS */}
            {item.subItems && openIndex === index && isOpen && (
              <ul className={styles.subMenu}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className={styles.subMenuItem}>
                    <div
                      className={styles.link}
                      >
                      <div className={`${styles.subItems}`}>
                        {generateIcon(subItem.iconIndex, '#7747C0')}
                        {subItem.name}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div className={styles.user}>
          <div className={styles.username}>
            <Image
              src={user.src}
              className={styles.userImage}
              alt={'پروفایل کاربر'}
              width={100}
              height={100}
              id='img'
            />
            <div className={styles.status}></div>
            {user.name}
          </div>
          <LogoutCurve />
        </div>
      </ul>
    </div>
  )
}

export default Sidebar
