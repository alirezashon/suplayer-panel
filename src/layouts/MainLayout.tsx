'use client'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useState } from 'react'
import ContextLoader from '@/Context/Loader'

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className='flex min-h-screen bg-gray-100 transition-all duration-700'>
      <div
        className={`transition-all duration-700 ${
          isSidebarOpen ? 'min-w-[17%] max-md:w-[95%] ' : 'w-[5%] max-md:w-[7%]'
        }`}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className='flex flex-col flex-grow'>
        <div className='px-8 py-4'>
          <Header />
        </div>
        <div className='p-4 flex-grow '>{children}</div>
        <ContextLoader />
      </div>
    </div>
  )
}

export default MainLayout
