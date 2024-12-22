'use client'
import { useState } from 'react'
import { data } from './data'
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
import { useMenu } from '@/Context/Menu'

const user = {
  name: 'محدثه عالمی',
  src: '/images/2.png',
}

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { menu, setMenu } = useMenu()

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
    )
      return null
    const IconComponent = iconList[iconIndex]
    return <IconComponent color={color} size={24} />
  }

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className={`fixed top-0 right-0 h-full p-[1vh] transition-all duration-300 min-w-[17%]
       bg-white flex flex-col overflow-y-auto border border-[#C9D0D8]`}>
      <div
        className={`sticky top-[2vh] flex items-center pb-[1vh] border-b border-[#C9D0D8]`}>
        {isOpen && (
          <Image
            src={'/icons/logo.svg'}
            alt='logo'
            width={200}
            height={100}
            className='w-[80%] h-[7vh] object-contain'
          />
        )}
        <div
          className='cursor-pointer ml-auto'
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MenuBoard size={24} /> : <Menu color='gray' size={24} />}
        </div>
      </div>

      {/* Menu Items */}
      <ul className='mt-[2vh]'>
        <p className='text-[#878FA4]'>منو اصلی</p>
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
                openIndex === index ? 'white' : isOpen ? 'gray' : '#50545F'
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
              <ul className='ml-[2vw]'>
                {item.subItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className='flex items-center p-[1vh] cursor-pointer'
                    onClick={() => {
                      location.hash = subItem.link
                      setMenu(subItem.link)
                    }}>
                    {generateIcon(subItem.iconIndex, '#7747C0')}
                    <span
                      className={`ml-[1vw] '${
                        menu == subItem.link && 'text-[#7747C0]'
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
        <div className='flex items-center relative'>
          <Image
            src={user.src}
            alt='پروفایل کاربر'
            width={48}
            height={48}
            className='w-[6vh] h-[6vh] object-cover rounded-full'
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

// 'use client'
// import { useState } from 'react'
// import { data } from './data'
// import styles from './index.module.css'
// import {
//   Menu,
//   MenuBoard,
//   Profile2User,
//   Receipt1,
//   Add,
//   People,
//   MoneySend,
//   Box1,
//   UserAdd,
//   PresentionChart,
//   FavoriteChart,
//   ChartSuccess,
//   Call,
//   MessageFavorite,
//   Ticket,
//   MessageNotif,
//   ArrowDown2,
//   LogoutCurve,
//   Strongbox2,
// } from 'iconsax-react'
// import Image from 'next/image'
// const user = {
//   name: 'محدثه عالمی',
//   src: '/images/2.png',
// }
// const Sidebar: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null)
//   const [isOpen, setIsOpen] = useState<boolean>(true)
//   const iconList = [
//     Menu,
//     Strongbox2,
//     Receipt1,
//     MoneySend,
//     MenuBoard,
//     People,
//     UserAdd,
//     Box1,
//     Profile2User,
//     PresentionChart,
//     FavoriteChart,
//     ChartSuccess,
//     MessageFavorite,
//     Ticket,
//     MessageNotif,
//     Call,
//   ]

//   const generateIcon = (iconIndex: number | undefined, color: string) => {
//     if (
//       iconIndex === undefined ||
//       iconIndex < 0 ||
//       iconIndex >= iconList.length
//     ) {
//       return null
//     }

//     const IconComponent = iconList[iconIndex]
//     return <IconComponent color={color} size={24} />
//   }

//   return (
//     <div
//       className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
//       <div className={`${styles.topSection} ${styles.bottomBorder}`}>
//         {isOpen && (
//           <Image
//             src={'/icons/logo.svg'}
//             alt='logo'
//             width={200}
//             height={100}
//             className={styles.logo}
//           />
//         )}
//         <div className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <MenuBoard /> : <Menu color='gray' />}
//         </div>
//       </div>

//       <ul className={styles.menu}>
//         <p>منو اصلی</p>
//         {data.map((item, index) => (
//           <li
//             key={index}
//             className={`${styles.menuItem} ${
//               openIndex === index && styles.bottomBorder
//             }`}
//             onClick={() => setOpenIndex(openIndex === index ? null : index)}>
//             {isOpen && index === 4 ? (
//               <p>دسترسی سریع</p>
//             ) : (
//               isOpen && index === 5 && <p>پشتیبانی تلفنی</p>
//             )}
//             <div
//               className={`${styles.itemHeader} ${
//                 openIndex === index ? styles.active : ''
//               }`}>
//               {generateIcon(
//                 item.iconIndex,
//                 openIndex === index ? 'white' : isOpen ? 'gray' : '#50545F'
//               )}
//               {isOpen && (
//                 <div
//                   className={`${styles.link} ${
//                     openIndex === index ? styles.active : ''
//                   }`}>
//                   {item.name}
//                 </div>
//               )}
//               {item.subItems && isOpen && (
//                 <div
//                   style={{
//                     transform: `rotate(${
//                       openIndex === index ? '180' : '0'
//                     }deg)`,
//                     display: 'flex',
//                   }}>
//                   <ArrowDown2
//                     color={openIndex === index ? 'white' : '#50545F'}
//                   />
//                 </div>
//               )}
//             </div>
//             {/* SUB ITEMS */}
//             {item.subItems && openIndex === index && isOpen && (
//               <ul className={styles.subMenu}>
//                 {item.subItems.map((subItem, subIndex) => (
//                   <li key={subIndex} className={styles.subMenuItem}>
//                     <div
//                       className={styles.link}
//                       >
//                       <div className={`${styles.subItems}`}>
//                         {generateIcon(subItem.iconIndex, '#7747C0')}
//                         {subItem.name}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//         <div className={styles.user}>
//           <div className={styles.username}>
//             <Image
//               src={user.src}
//               className={styles.userImage}
//               alt={'پروفایل کاربر'}
//               width={100}
//               height={100}
//               id='img'
//             />
//             <div className={styles.status}></div>
//             {user.name}
//           </div>
//           <LogoutCurve />
//         </div>
//       </ul>
//     </div>
//   )
// }

// export default Sidebar
