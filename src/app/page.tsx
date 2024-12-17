'use client'
import Dashboard from '@/components/Dashboard'
import Groups from '@/components/Groups'
import SubGroups from '@/components/SubGroups'
import LinearChart from '@/components/Wallet/page'
import { useMenu } from '@/Context/Menu'

const Home = () => {
  const { menu } = useMenu()
  return (
    <div>
      {menu === '0' ? (
        <Dashboard />
      ) : menu === '1' ? (
        <LinearChart />
      ) : (
      // <Groups />
      <SubGroups/>
      )}
    </div>
  )
}

export default Home
