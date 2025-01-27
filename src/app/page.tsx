'use client'
import {
  getGroupData,
  getSubGroupData,
  getProductData,
  getProductGroupData,
  getBeneficiaryData,
  getUserInfo,
  getReferrerData,
  getReferrerChart,
  getCampaignData,
  getPromotiuonData,
} from '@/actions/setData'
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
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
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
    setUserInfo,
    setReferrerData,
    setBrandsData,
    setReferrerChartData,
    setCampaignData,
    setPromotionData,
  } = useData()
  const { setProductGroupStates } = useStates()
  useEffect(() => {
    const fetcher = async () => {
      await getUserInfo().then((value) => value && setUserInfo(value))
      const groups = await getGroupData()
      if (groups) setGroupData(groups)
      const subGroups = await getSubGroupData()
      if (subGroups) setSubGroupData(subGroups)
      const products = await getProductData()
      if (products) setProductData(products)
      const beneficiaries = await getBeneficiaryData()
      if (beneficiaries) setBeneficiaryData(beneficiaries)
      await getReferrerData().then((value) => value && setReferrerData(value))
      await getProductGroupData().then((value) => {
        if (value) {
          setProductGroupData(value.productGroups)
          setBrandsData(value.brands)
        }
      })
      await getReferrerChart().then(
        (value) => value && setReferrerChartData(value)
      )
      await getCampaignData().then((value) => value && setCampaignData(value))
      await getPromotiuonData().then(
        (value) => value && setPromotionData(value)
      )
    }
    fetcher()
    const handleHashChange = () => {
      const tag = location.hash.substring(1)
      setMenu(tag)
      setLoading(false)
      if (['productgroups', 'product-brands'].includes(tag))
        setProductGroupStates((tag as 'productgroups') || 'product-brands')
    }
    window.addEventListener('hashchange', handleHashChange, false)
    handleHashChange()
    const timeout = setTimeout(() => {
      location.href = '/auth/login' // هدایت کاربر به صفحه لاگین بعد از مدت زمان مشخص
    }, 30 * 60 * 1000) // 30 دقیقه

    return () => {
      clearTimeout(timeout)
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
            ) : ['productgroups', 'product-brands'].includes(menu) ? (
              <ProductGroupsPage />
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
            ) : menu === 'variablels' ? (
              <Variables />
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
