'use client'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import CustomModal from '@/components/shared/CustomModal'
import FinanceReports from '@/components/Reports/Finance'
import TransactionReports from '@/components/Reports/transactions'

const Beneficiary = dynamic(() => import('@/components/Beneficiary'))
const Campaign = dynamic(() => import('@/components/Campaign'))
const Dashboard = dynamic(() => import('@/components/Dashboard'))
const Deposite = dynamic(() => import('@/components/Deposite'))
const MyGroups = dynamic(() => import('@/components/MyGroups'))
const PorsantManagement = dynamic(() => import('@/components/PorsantManagement'))
const ProductGroupsPage = dynamic(() => import('@/components/ProductGroups'))
const Product = dynamic(() => import('@/components/ProductGroups/Brands/Products'))
const Profile = dynamic(() => import('@/components/Profile'))
const Promotion = dynamic(() => import('@/components/Promotions'))
const ReferralLevels = dynamic(() => import('@/components/Referral Levels'))
const Referrer = dynamic(() => import('@/components/Referrer'))
const Loading = dynamic(() => import('@/components/shared/Loading'))
const SubGroups = dynamic(() => import('@/components/SubGroups'))
const Variables = dynamic(() => import('@/components/Variables'))
const Wallet = dynamic(() => import('@/components/Wallet'))
const MainLayout = dynamic(() => import('@/layouts/MainLayout'))

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
             <Loading />
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
