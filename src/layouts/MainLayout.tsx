import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) =>{
  return (
    <>
      <div className='w-[17%]'>
        <Sidebar />
      </div>
      <div className={'w-[83%]'}>
        <Header />
        {children}
      </div>
    </>
  )
}
export default MainLayout