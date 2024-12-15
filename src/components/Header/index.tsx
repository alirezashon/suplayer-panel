import { Message, Notification, Profile } from 'iconsax-react'
import styles from './index.module.css'

const Header: React.FC = () => {
  const user = 'پارس حیان'
  return (
    <div className={'w-[80%] flex justify-between items-center mb-4 mr-[20%]'}>
      <h3> داشبورد</h3>
      <div className={styles.userBox}>
        <Notification color='#50545F' size={24}/>
        <Message color='#50545F' size={24}/>
        <div className={styles.username}>{user}</div>
        <Profile color='#50545F' size={24}/>
      </div>
    </div>
  )
}

export default Header
