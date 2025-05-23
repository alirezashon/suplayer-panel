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
  TreeChartInterface,
  ReferrerData,
  SubGroup,
  TransactionInterface,
  WalletDetail,
  ShowSystemTypeUI,
  AllocatedListInterface,
  ReleasedListInterface,
  CommissionFullList,
} from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DataContextProps {
  productData: ProductsData[] | undefined
  setProductData: (value: ProductsData[]) => void
  productGroupData: ProductGroupData[] | undefined
  setProductGroupData: (value: ProductGroupData[]) => void
  brandsData: ProductGroupData[] | undefined
  setBrandsData: (value: ProductGroupData[]) => void
  groupData: GroupData[] | undefined
  setGroupData: (value: GroupData[]) => void
  subGroupData: SubGroup[] | undefined
  setSubGroupData: (value: SubGroup[]) => void
  beneficiaryData: BeneficiaryData[] | undefined
  setBeneficiaryData: (value: BeneficiaryData[]) => void
  userInfo: IUserResponse | undefined
  setUserInfo: (value: IUserResponse) => void
  referrerData: ReferrerData[] | undefined
  setReferrerData: (value: ReferrerData[]) => void
  TreeChartInterface: TreeChartInterface[] | undefined
  setTreeChartInterface: (value: TreeChartInterface[]) => void
  campaignData: CampaignInterface[] | undefined
  setCampaignData: (value: CampaignInterface[]) => void
  promotionData: PromotionInterface[] | undefined
  setPromotionData: (value: PromotionInterface[]) => void
  draftsData: DraftsData[] | undefined
  setDraftsData: (value: DraftsData[]) => void
  KPITaskData: KPIData[] | undefined
  setKPITaskData: (value: KPIData[]) => void
  transactionsData: TransactionInterface[] | undefined
  setTransactionsData: (value: TransactionInterface[]) => void
  balance: WalletDetail | undefined
  setBalance: (value: WalletDetail) => void
  allocationList: AllocatedListInterface[] | undefined
  setAllocationList: (value: AllocatedListInterface[]) => void
  releasedList: ReleasedListInterface[] | undefined
  setReleasedList: (value: ReleasedListInterface[]) => void
  systemTypes:
    | {
        productTypes: ShowSystemTypeUI[]
        groupTypes: ShowSystemTypeUI[]
      }
    | undefined
  setSystemTypes: (value: {
    productTypes: ShowSystemTypeUI[]
    groupTypes: ShowSystemTypeUI[]
  }) => void
  commissionFullList: CommissionFullList[] | undefined
  setCommissionFullList: (value: CommissionFullList[]) => void
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
  const [TreeChartInterface, setTreeChartInterface] = useState<
    TreeChartInterface[]
  >([])
  const [promotionData, setPromotionData] = useState<PromotionInterface[]>([])
  const [draftsData, setDraftsData] = useState<DraftsData[]>([])
  const [KPITaskData, setKPITaskData] = useState<KPIData[]>([])
  const [allocationList, setAllocationList] = useState<
    AllocatedListInterface[]
  >([])
  const [releasedList, setReleasedList] = useState<ReleasedListInterface[]>([])
  const [balance, setBalance] = useState<WalletDetail>()
  const [transactionsData, setTransactionsData] = useState<
    TransactionInterface[]
  >([])
  const [commissionFullList, setCommissionFullList] = useState<
    CommissionFullList[]
  >([])
  const [systemTypes, setSystemTypes] = useState<{
    productTypes: ShowSystemTypeUI[]
    groupTypes: ShowSystemTypeUI[]
  }>({ productTypes: [], groupTypes: [] })

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
        TreeChartInterface,
        setTreeChartInterface,
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
        transactionsData,
        setTransactionsData,
        allocationList,
        setAllocationList,
        systemTypes,
        setSystemTypes,
        releasedList,
        setReleasedList,
        commissionFullList,
        setCommissionFullList,
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
