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
  getKPITaskData,
  getBalance,
  getTransactionHistory,
  getAllocatedList,
  getSystemTypes,
  getReleasedList,
} from '@/actions/setData'
import { useStates } from './States'
import { useData } from './Data'
import { useEffect } from 'react'
import { generateMultiSelectData } from '@/hooks/convertDataTree'
import {
  GroupData,
  ProductGroupData,
  ProductsData,
  SubGroup,
} from '@/interfaces'

const ContextLoader = () => {
  const {
    setGroupData,
    setSubGroupData,
    setProductData,
    setProductGroupData,
    setBeneficiaryData,
    setUserInfo,
    setReferrerData,
    setBrandsData,
    setTreeChartInterface,
    setCampaignData,
    setPromotionData,
    setKPITaskData,
    setBalance,
    setTransactionsData,
    setAllocationList,
    setSystemTypes,
    setReleasedList,
  } = useData()
  const {
    setProductGroupStates,
    setGroupSelectorData,
    setProductGroupSelectorData,
  } = useStates()
  useEffect(() => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1]

    if (!accessToken && location.pathname !== '/auth/login') {
      location.href = '/auth/login'
      return
    }
    const fetcher = async () => {
      await getUserInfo().then((value) => value && setUserInfo(value))

      await getReferrerData().then((value) => value && setReferrerData(value))
      const [groupData, subGroupsData, productData, productGroupsData] =
        await Promise.all([
          getGroupData(),
          getSubGroupData(),
          getProductData(),
          getProductGroupData(),
        ])

      if (groupData) setGroupData(groupData)
      if (subGroupsData) setSubGroupData(subGroupsData)
      if (productData) setProductData(productData)
      if (productGroupsData) {
        setProductGroupData(
          productGroupsData.productGroups as ProductGroupData[]
        )
        setBrandsData(productGroupsData.brands as ProductGroupData[])
      }

      const groupOptionTreesData = {
        data: groupData as GroupData[],
        idKey: 'sup_group_id',
        labelKey: 'sup_group_name',
      }
      const subGroupOptionTreesData = {
        data: subGroupsData as SubGroup[],
        idKey: 'supervisor_id',
        labelKey: 'supervisor_name',
        parrentKey: 'sup_group_id',
      }
      const groupMultiSelectorData =
        groupData &&
        generateMultiSelectData({
          level1: groupOptionTreesData,
          level2: subGroupOptionTreesData,
          level3: null,
        })
      if (groupMultiSelectorData) setGroupSelectorData(groupMultiSelectorData)

      const productGroupOptionTreesData = {
        data: productGroupsData?.productGroups as ProductGroupData[],
        idKey: 'id',
        labelKey: 'group_desc',
      }
      const brandOptionTreesData = {
        data: productGroupsData?.brands as ProductGroupData[],
        idKey: 'id',
        labelKey: 'group_desc',
        parrentKey: 'group_pid',
      }
      const productOptionTreesData = {
        data: productData as ProductsData[],
        idKey: 'id',
        labelKey: 'ini_name',
        parrentKey: 'group_id',
      }
      const productGroupMultiSelectorData =
        productGroupsData?.productGroups &&
        generateMultiSelectData({
          level1: productGroupOptionTreesData,
          level2: brandOptionTreesData,
          level3: productOptionTreesData,
        })
      await getBeneficiaryData().then(
        (result) => result && setBeneficiaryData(result)
      )
      if (productGroupMultiSelectorData)
        setProductGroupSelectorData(productGroupMultiSelectorData)

      await getReferrerChart().then(
        (value) => value && setTreeChartInterface(value)
      )
      await getCampaignData().then((value) => value && setCampaignData(value))
      await getPromotiuonData().then(
        (value) => value && setPromotionData(value)
      )
      await getKPITaskData().then((result) => result && setKPITaskData(result))
      await getBalance().then((result) => result && setBalance(result))
      await getTransactionHistory().then(
        (result) => result && setTransactionsData(result)
      )
      await getSystemTypes().then((result) => {
        if (result) setSystemTypes(result)
      })
      await getAllocatedList().then(
        (result) => result && setAllocationList(result)
      )
      await getReleasedList().then(
        (result) => result && setReleasedList(result)
      )
    }
    fetcher()
  }, [
    setGroupData,
    setSubGroupData,
    setBalance,
    setBeneficiaryData,
    setBrandsData,
    setCampaignData,
    setKPITaskData,
    setProductData,
    setProductGroupData,
    setProductGroupStates,
    setPromotionData,
    setTreeChartInterface,
    setReferrerData,
    setUserInfo,
    setTransactionsData,
    setSystemTypes,
    setAllocationList,
    setGroupSelectorData,
    setProductGroupSelectorData,
    setReleasedList,
  ])
  return <div></div>
}
export default ContextLoader
