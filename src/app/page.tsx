'use client'
import {
  getGroupData,
  getSubGroupData,
  getProductData,
  getProductGroupData,
  getBeneficiaryData,
} from '@/actions/setData'
import Beneficiary from '@/components/Beneficiary'
import Campaign from '@/components/Campaign'
import Dashboard from '@/components/Dashboard'
import Deposite from '@/components/Deposite'
import MyGroups from '@/components/MyGroups'
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
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import MainLayout from '@/layouts/MainLayout'
import { useEffect, useState } from 'react'

const Home = () => {
  const { menu, setMenu } = useMenu()
  const [loading, setLoading] = useState<boolean>(true)
  const {
    setGroupData,
    setSubGroupData,
    setProductData,
    setProductGroupData,
    setBeneficiaryData,
  } = useData()

  useEffect(() => {
    const fetcher = async () => {
      const groups = await getGroupData()
      if (groups) setGroupData(groups)
      const subGroups = await getSubGroupData()
      if (subGroups) setSubGroupData(subGroups)
      const productsGroups = await getProductGroupData()
      if (productsGroups) setProductGroupData(productsGroups)
      const products = await getProductData()
      if (products) setProductData(products)
      const beneficiaries = await getBeneficiaryData()
      if (beneficiaries) setBeneficiaryData(beneficiaries)
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
  }, [setMenu, setGroupData, setSubGroupData])

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
            ) : [
                'porsant',
                'porsantmanagement',
                'groupsdetail',
                'allocation',
                'release',
              ].includes(menu) ? (
              <PorsantManagement />
            ) : menu === 'beneficiary' ? (
              <Beneficiary />
            ) : menu === 'referral-levels' ? (
              <ReferralLevels />
            ) : (
              ['dashboard', ''].includes(menu) && <Dashboard />
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
