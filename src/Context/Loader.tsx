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
} from '@/actions/setData'
import { useStates } from './States'
import { useData } from './Data'
import { useEffect } from 'react'
import { generateMultiSelectData } from '@/hooks/convertDataTree'
import { GroupData, ProductGroupData, ProductsData, SubGroup } from '@/interfaces'

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
  } = useData()
  const {
    setProductGroupStates,
    setGroupSelectorData,
    setProductGroupSelectorData,
  } = useStates()
  useEffect(() => {
    const fetcher = async () => {
      await getUserInfo().then((value) => value && setUserInfo(value))
      await getBeneficiaryData().then(
        (result) => result && setBeneficiaryData(result)
      )
      await getReferrerData().then((value) => value && setReferrerData(value))

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
      await getAllocatedList().then(
        (result) => result && setAllocationList(result)
      )
      await getSystemTypes().then((result) => {
        result.productTypes && setSystemTypes(result)
      })

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
        setProductGroupData(productGroupsData.productGroups)
        setBrandsData(productGroupsData.brands)
      }
      
      const groupOptionTreesData = {
        data: groupData as any[],
        idKey: 'sup_group_id',
        labelKey: 'sup_group_name',
      }
      const subGroupOptionTreesData = {
        data: subGroupsData as any[],
        idKey: 'supervisor_id',
        labelKey: 'supervisor_name',
        parrentKey: 'sup_group_id',
      }
      const groupMultiSelectorData = generateMultiSelectData({
        level1: groupOptionTreesData,
        level2: subGroupOptionTreesData,
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
      const productGroupMultiSelectorData = generateMultiSelectData({
        level1: productGroupOptionTreesData,
        level2: brandOptionTreesData,
        level3: productOptionTreesData,
      })
      if (productGroupMultiSelectorData)
        setProductGroupSelectorData(productGroupMultiSelectorData)
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
  ])
  return <div></div>
}

export default ContextLoader
