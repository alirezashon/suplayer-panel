import { Message, Notification, Profile } from 'iconsax-react'

const Header: React.FC = () => {
  const user = 'پارس حیان'
  return (
    <div className={'flex w-full justify-between items-center mb-4 p-5 bg-white '}>
      <h3> داشبورد</h3>
      <div className={'flex gap-5'}>
        <Notification color='#50545F' size={24}/>
        <Message color='#50545F' size={24}/>
        <div className={''}>{user}</div>
        <Profile color='#50545F' size={24}/>
      </div>
    </div>
  )
}

export default Header
