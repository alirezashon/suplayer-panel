'use client'
import Dashboard from '@/components/Dashboard'
import LinearChart from '@/components/Wallet/page'
import { useMenu } from '@/Context/Menu'

const Home = () => {
  const { menu } = useMenu()
  return (
    <div>
     {menu === '0' ? <Dashboard />:<LinearChart/>}
    </div>
  )
}

export default Home
