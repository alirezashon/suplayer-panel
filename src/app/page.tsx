'use client'
import { getGroupData, getSubGroupData } from '@/actions/setData'
import Beneficiary from '@/components/Beneficiary'
import Campaign from '@/components/Campaign'
import Dashboard from '@/components/Dashboard'
import Deposite from '@/components/Deposite'
import MyGroups from '@/components/MyGroups'
import GroupsDetail from '@/components/MyGroups/GroupDetail'
import PorsantManagement from '@/components/PorsantManagement'
import ProductGroups from '@/components/ProductGroups'
import Product from '@/components/Products'
import Profile from '@/components/Profile'
import Promotion from '@/components/Promotions'
import ReferralLevels from '@/components/Referral Levels'
import Referrer from '@/components/Referrer'
import Loading from '@/components/shared/LoadingSpinner'
import SubGroups from '@/components/SubGroups'
import Wallet from '@/components/Wallet'
import { useGroupData } from '@/Context/GroupsData'
import { useMenu } from '@/Context/Menu'
import { useSubGroupData } from '@/Context/SubGroupsData'
import MainLayout from '@/layouts/MainLayout'
import { useEffect, useState } from 'react'

const Home = () => {
  const { menu, setMenu } = useMenu()
  const [loading, setLoading] = useState<boolean>(true)
  const { setGroupData } = useGroupData()
  const { setSubGroupData } = useSubGroupData()

  useEffect(() => {
    const fetcher = async () => {
      const groups = await getGroupData()
      if (groups) setGroupData(groups)
      const subGroups = await getSubGroupData()
      if (subGroups) setSubGroupData(subGroups)
    }
    fetcher()
    const handleHashChange = () => {
      const tag = location.hash.substring(1)
      setMenu(tag)
      setLoading(false)
    }
    window.addEventListener('hashchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [setMenu,setGroupData,setSubGroupData])

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
            ) : menu === 'beneficiary' ? (
              <Beneficiary />
            ) : menu === 'referral-levels' ? (
              <ReferralLevels />
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
