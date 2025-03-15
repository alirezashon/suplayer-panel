'use client'
import Beneficiary from '@/components/Beneficiary'
import Campaign from '@/components/Campaign'
import Dashboard from '@/components/Dashboard'
import Deposite from '@/components/Deposite'
import MyGroups from '@/components/MyGroups'
import PorsantManagement from '@/components/PorsantManagement'
import ProductGroupsPage from '@/components/ProductGroups'
import Product from '@/components/ProductGroups/Brands/Products'
import Profile from '@/components/Profile'
import Promotion from '@/components/Promotions'
import ReferralLevels from '@/components/Referral Levels'
import Referrer from '@/components/Referrer'
import Loading from '@/components/shared/LoadingSpinner'
import SubGroups from '@/components/SubGroups'
import Variables from '@/components/Variables'
import Wallet from '@/components/Wallet'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import MainLayout from '@/layouts/MainLayout'
import { useEffect, useState } from 'react'
import CustomModal from '@/components/shared/CustomModal'
import FinanceReports from '@/components/Reports/Finance'
import TransactionReports from '@/components/Reports/transactions'

const Home = () => {
  const { modalContent } = useStates()
  const { menu, setMenu } = useMenu()
  const [loading, setLoading] = useState<boolean>(true)

  const { setProductGroupStates } = useStates()
  useEffect(() => {
    const handleHashChange = () => {
      const tag = location.hash.substring(1)
      setMenu(tag)
      setLoading(false)
      if (['productgroups', 'product-brands'].includes(tag))
        setProductGroupStates((tag as 'productgroups') || 'product-brands')
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1]

      if (!accessToken) {
        location.href = '/auth/login'
        return
      }
    }
    window.addEventListener('hashchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [setMenu, setProductGroupStates])

  return (
    <MainLayout>
      <div >
        {modalContent && <CustomModal />}

        {loading ? (
          <div className='flex h-screen w-full justify-center items-center'>
            <Loading size={56} />
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
            ) : ['productgroups', 'product-brands'].includes(menu) ? (
              <ProductGroupsPage />
            ) : menu === 'products' ? (
              <Product />
            ) : ['deposite', 'deposite-draft'].includes(menu) ? (
              <Deposite />
            ) : [
                'promotion',
                'promotion-list',
                'new-promotion',
                'edit-promotion',
                'view-promotion',
                'promotion-view',
              ].includes(menu) ? (
              <Promotion />
            ) : menu === 'finance-report' ? (
              <FinanceReports />
            ) : menu === 'transactions-reports' ? (
              <TransactionReports />
            ) : ['campaign', 'campaign-list', 'view-campaign'].includes(
                menu
              ) ? (
              <Campaign />
            ) : [
                'porsant',
                'porsantmanagement',
                'groupsdetail',
                'allocation',
                'release',
                'reports',
              ].includes(menu) ? (
              <PorsantManagement />
            ) : menu === 'beneficiary' ? (
              <Beneficiary />
            ) : menu === 'referral-levels' ? (
              <ReferralLevels />
            ) : menu === 'variablels' ? (
              <Variables />
            ) : (
              ['dashboard', ''].includes(menu) && <Dashboard />
            )}
          </div>
        ) : (
          <Profile />
        )}
      </div>
    </MainLayout>
  )
}

export default Home
