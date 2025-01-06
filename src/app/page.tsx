'use client'
import Campaign from '@/components/Campaign'
import Dashboard from '@/components/Dashboard'
import Deposite from '@/components/Deposite'
import Groups from '@/components/Groups'
import MyGroups from '@/components/MyGroups'
import GroupsDetail from '@/components/MyGroups/GroupDetail'
import PorsantManagement from '@/components/PorsantManagement'
import ProductGroups from '@/components/ProductGroups'
import Product from '@/components/Products'
import Profile from '@/components/Profile'
import Promotion from '@/components/Promotions'
import Referrer from '@/components/Referrer'
import Loading from '@/components/shared/LoadingSpinner'
import SubGroups from '@/components/SubGroups'
import Wallet from '@/components/Wallet'
import { useMenu } from '@/Context/Menu'
import MainLayout from '@/layouts/MainLayout'
import { useEffect, useState } from 'react'

const Home = () => {
  const { menu, setMenu } = useMenu()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const handleHashChange = () => {
      const tag = location.hash.substring(1)
      setMenu(tag)
      setLoading(false)
    }
    window.addEventListener('menuchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('menuchange', handleHashChange, false)
    }
  }, [setMenu])

  return (
    <MainLayout>
      <>
        {loading ? (
          <div className='flex h-screen w-full justify-center items-center'>
            <Loading size={32} />
          </div>
        ) : menu !== 'profile' ? (
          <div>
            {menu === 'wallet' ? (
              <Wallet />
            ) : menu === 'mygroups' ? (
              <MyGroups />
            ) : menu === 'groupmanagement' ? (
              <Groups />
            ) : menu === 'subgroups' ? (
              <SubGroups />
            ) : menu === 'referrers' ? (
              <Referrer />
            ) : menu === 'productgroups' ? (
              <ProductGroups />
            ) : menu === 'products' ? (
              <Product />
            ) : menu === 'groupsdetail' ? (
              <GroupsDetail />
            ) : menu === 'deposite' ? (
              <Deposite />
            ) : [
                'promotion',
                'promotion-list',
                'new-promotion',
                'edit-promotion',
                'view-promotion',
              ].includes(menu) ? (
              <Promotion />
            ) : ['campaign', 'campaign-list', 'view-campaign'].includes(
                menu
              ) ? (
              <Campaign />
            ) : ['porsant', 'porsantmanagement'].includes(menu) ? (
              <PorsantManagement />
            ) : (
              <Dashboard />
            )}
          </div>
        ) : (
          <Profile />
        )}
      </>
    </MainLayout>
  )
}

export default Home
