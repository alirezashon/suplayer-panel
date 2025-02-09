'use client'
import {
  BeneficiaryData,
  CampaignInterface,
  DraftsData,
  GroupData,
  IUserResponse,
  KPIData,
  ProductGroupData,
  ProductsData,
  PromotionInterface,
  ReferrerChartData,
  ReferrerData,
  SubGroup,
} from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DataContextProps {
  productData: ProductsData[] | undefined
  setProductData: (ProductData: ProductsData[]) => void
  productGroupData: ProductGroupData[] | undefined
  setProductGroupData: (ProductData: ProductGroupData[]) => void
  brandsData: ProductGroupData[] | undefined
  setBrandsData: (ProductData: ProductGroupData[]) => void
  groupData: GroupData[] | undefined
  setGroupData: (GroupData: GroupData[]) => void
  subGroupData: SubGroup[] | undefined
  setSubGroupData: (SubGroupData: SubGroup[]) => void
  beneficiaryData: BeneficiaryData[] | undefined
  setBeneficiaryData: (SubGroupData: BeneficiaryData[]) => void
  userInfo: IUserResponse | undefined
  setUserInfo: (SubGroupData: IUserResponse) => void
  referrerData: ReferrerData[] | undefined
  setReferrerData: (SubGroupData: ReferrerData[]) => void
  referrerChartData: ReferrerChartData[] | undefined
  setReferrerChartData: (SubGroupData: ReferrerChartData[]) => void
  campaignData: CampaignInterface[] | undefined
  setCampaignData: (SubGroupData: CampaignInterface[]) => void
  promotionData: PromotionInterface[] | undefined
  setPromotionData: (SubGroupData: PromotionInterface[]) => void
  draftsData: DraftsData[] | undefined
  setDraftsData: (SubGroupData: DraftsData[]) => void
  KPITaskData: KPIData[] | undefined
  setKPITaskData: (SubGroupData: KPIData[]) => void
  balance:
    | {
        removable: number
        allBalance: number
      }
    | undefined
  setBalance: (SubGroupData: { removable: number; allBalance: number }) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [productData, setProductData] = useState<ProductsData[]>([])
  const [productGroupData, setProductGroupData] = useState<ProductGroupData[]>(
    []
  )
  const [brandsData, setBrandsData] = useState<ProductGroupData[]>([])
  const [groupData, setGroupData] = useState<GroupData[]>([])
  const [subGroupData, setSubGroupData] = useState<SubGroup[]>([])
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryData[]>([])
  const [userInfo, setUserInfo] = useState<IUserResponse>()
  const [referrerData, setReferrerData] = useState<ReferrerData[]>([])
  const [campaignData, setCampaignData] = useState<CampaignInterface[]>([])
  const [referrerChartData, setReferrerChartData] = useState<
    ReferrerChartData[]
  >([])
  const [promotionData, setPromotionData] = useState<PromotionInterface[]>([])
  const [draftsData, setDraftsData] = useState<DraftsData[]>([])
  const [KPITaskData, setKPITaskData] = useState<KPIData[]>([])
  const [balance, setBalance] = useState<{
    removable: number
    allBalance: number
  }>()
  return (
    <DataContext.Provider
      value={{
        productData,
        setProductData,
        productGroupData,
        setProductGroupData,
        groupData,
        setGroupData,
        subGroupData,
        setSubGroupData,
        beneficiaryData,
        setBeneficiaryData,
        userInfo,
        setUserInfo,
        referrerData,
        setReferrerData,
        brandsData,
        setBrandsData,
        referrerChartData,
        setReferrerChartData,
        campaignData,
        setCampaignData,
        promotionData,
        setPromotionData,
        draftsData,
        setDraftsData,
        KPITaskData,
        setKPITaskData,
        balance,
        setBalance,
      }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('productData Provider')
  }
  return context
}
