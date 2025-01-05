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
import SubGroups from '@/components/SubGroups'
import Wallet from '@/components/Wallet'
import { useMenu } from '@/Context/Menu'
import MainLayout from '@/layouts/MainLayout'
import { useEffect } from 'react'

const Home = () => {
  const { menu, setMenu } = useMenu()
  useEffect(() => {
    const handleHashChange = () => {
      const tag = location.hash.substring(1)
      setMenu(tag)
    }
    window.addEventListener('menuchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('menuchange', handleHashChange, false)
    }
  }, [setMenu])

  return (
    <MainLayout>
      {menu !== 'profile' ? (
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
          ) : ['campaign', 'campaign-list', 'view-campaign'].includes(menu) ? (
            <Campaign />
          ) : ['porsant'].includes(menu) ? (
            <PorsantManagement />
          ) : (
            <Dashboard />
          )}
        </div>
      ) : (
        <Profile />
      )}
    </MainLayout>
  )
}

export default Home
