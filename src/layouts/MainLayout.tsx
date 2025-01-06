'use client'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useState } from 'react'

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'min-w-[17%]' : 'w-[5%]'
        } bg-white`}>
        <Sidebar />
      </div>
      <div className='flex flex-col flex-grow'>
        <div className='bg-white'>
          <Header />
        </div>
        <div className='p-4 flex-grow'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
