'use client'
import { usePathname } from 'next/navigation'
import { EmptyWallet, People, Profile, TransactionMinus } from 'iconsax-react'

const NavigationLinks = ({ role }: { role: string }) => {
  const path = usePathname()

  return (
    <footer
      className={`fixed flex justify-center py-2  bottom-0 start-0  w-full z-10 bg-white ${
        role === process.env.NEXT_PUBLIC_SECRETARY_ROLE && 'px-5'
      }`}>
      <ul className='flex items-center px-5 justify-between max-w-[888px] w-full'>
        <li>
          <button
            className='flex flex-col text-center items-center gap-1 !rounded-lg'
            onClick={() =>
              (location.href = `/${location.pathname.split('/')[1]}/wallet`)
            }>
            <EmptyWallet
              size='24'
              color={path.includes('/wallet') ? '#2F27CE' : '#2f27ce80'}
            />
            <span
              className={`text-xs sm:text-sm lg:text-base ${
                path.includes('/wallet') ? 'text-primary' : 'text-primary/50'
              }`}>
              کیف پول
            </span>
          </button>
        </li>
        {role === process.env.NEXT_PUBLIC_SECRETARY_ROLE && (
          <li>
            <button
              className='flex flex-col text-center items-center gap-1 !rounded-lg'
              onClick={() =>
                (location.href = `/${location.pathname.split('/')[1]}/select-wallet`)
              }>
              <EmptyWallet
                size='24'
                color={path.includes('/select-wallet') ? '#2F27CE' : '#2f27ce80'}
              />
              <span
                className={`text-xs sm:text-sm lg:text-base ${
                  path.includes('/select-wallet') ? 'text-primary' : 'text-primary/50'
                }`}>
                کیف پول های دیگر
              </span>
            </button>
          </li>
        )}
        <li>
          <button
            className='flex flex-col text-center items-center gap-1 !rounded-lg'
            onClick={() =>
              (location.href = `/${location.pathname.split('/')[1]}/reports`)
            }>
            <TransactionMinus
              size='24'
              color={path.includes('/reports') ? '#2F27CE' : '#2f27ce80'}
            />
            <span
              className={`text-xs sm:text-sm lg:text-base ${
                path.includes('/reports') ? 'text-primary' : 'text-primary/50'
              }`}>
              گزارش‌ها
            </span>
          </button>
        </li>
        {role === `${process.env.NEXT_PUBLIC_DOCTOR_ROLE}` && (
          <li>
            <button
              className='flex flex-col text-center items-center gap-1 !rounded-lg'
              onClick={() =>
                (location.href = `/${location.pathname.split('/')[1]}/clerk`)
              }>
              <People
                size='24'
                color={path.includes('/clerk') ? '#2F27CE' : '#2f27ce80'}
              />
              <span
                className={`text-xs sm:text-sm lg:text-base ${
                  path.includes('/clerk') ? 'text-primary' : 'text-primary/50'
                }`}>
                دستیار
              </span>
            </button>
          </li>
        )}
        <li>
          <button
            className='flex flex-col text-center items-center gap-1 !rounded-lg'
            onClick={() =>
              (location.href = `/${location.pathname.split('/')[1]}/profile`)
            }>
            <Profile
              size='24'
              color={path.includes('/profile') ? '#2F27CE' : '#2f27ce80'}
            />
            <span
              className={`text-xs sm:text-sm lg:text-base ${
                path.includes('/profile') ? 'text-primary' : 'text-primary/50'
              }`}>
              پروفایل
            </span>
          </button>
        </li>
      </ul>
    </footer>
  )
}

export default NavigationLinks
