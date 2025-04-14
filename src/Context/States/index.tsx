'use client'
import {
  GroupData,
  OptionTrees,
  ProductGroupData,
  ProductsData,
  PromotionInterface,
  SubGroup,
} from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface StatesContextProps {
  productGroupStates: 'productgroups' | 'product-brands'
  setProductGroupStates: (value: 'productgroups' | 'product-brands') => void
  selectedSubGroupData: SubGroup | undefined
  setSelectedSubGroupData: (SubGroupData: SubGroup) => void
  selectedGroupData: GroupData | undefined | null
  setSelectedGroupData: (SubGroupData: GroupData | null) => void
  modalContent: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => void
  closeModal: () => void
  selectedProductData:
    | {
        data: ProductsData[]
        group: ProductGroupData
        brand: ProductGroupData
      }
    | undefined
    | null
  setSelectedProductData: (
    SubGroupData: {
      data: ProductsData[]
      group: ProductGroupData
      brand: ProductGroupData
    } | null
  ) => void
  selectedProductBrandData:
    | {
        data: ProductGroupData[]
        group: ProductGroupData
      }
    | undefined
    | null
  setSelectedProductBrandData: (
    SubGroupData: {
      data: ProductGroupData[]
      group: ProductGroupData
    } | null
  ) => void
  selectedPromotionData: PromotionInterface | undefined | null
  setSelectedPromotionData: (SubGroupData: PromotionInterface | null) => void
  groupSelectorData: OptionTrees[] | undefined | null
  setGroupSelectorData: (data: OptionTrees[] | null) => void
  productGroupSelectorData: OptionTrees[] | undefined | null
  setProductGroupSelectorData: (data: OptionTrees[] | null) => void
  submitting: boolean
  setSubmitting: (value: boolean) => void
}

const StatesContext = createContext<StatesContextProps | undefined>(undefined)

export const StatesProvider = ({ children }: { children: ReactNode }) => {
  const [productGroupStates, setProductGroupStates] = useState<
    'productgroups' | 'product-brands'
  >('productgroups')

  const [selectedSubGroupData, setSelectedSubGroupData] = useState<SubGroup>()
  const [selectedGroupData, setSelectedGroupData] = useState<GroupData | null>()
  const [modalContent, setModalContent] = useState<{
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null>(null)

  const [selectedProductData, setSelectedProductData] = useState<{
    data: ProductsData[]
    group: ProductGroupData
    brand: ProductGroupData
  } | null>()

  const [selectedProductBrandData, setSelectedProductBrandData] = useState<{
    data: ProductGroupData[]
    group: ProductGroupData
  } | null>()
  const [selectedPromotionData, setSelectedPromotionData] =
    useState<PromotionInterface | null>()
  const [groupSelectorData, setGroupSelectorData] = useState<
    OptionTrees[] | null
  >()
  const [productGroupSelectorData, setProductGroupSelectorData] = useState<
    OptionTrees[] | null
  >()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const showModal = (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => setModalContent(content)
  const closeModal = () => setModalContent(null)
  return (
    <StatesContext.Provider
      value={{
        productGroupStates,
        setProductGroupStates,
        selectedSubGroupData,
        setSelectedSubGroupData,
        selectedGroupData,
        setSelectedGroupData,
        selectedProductData,
        setSelectedProductData,
        selectedProductBrandData,
        setSelectedProductBrandData,
        modalContent,
        showModal,
        closeModal,
        selectedPromotionData,
        setSelectedPromotionData,
        groupSelectorData,
        setGroupSelectorData,
        productGroupSelectorData,
        setProductGroupSelectorData,
        submitting,
        setSubmitting,
      }}>
      {children}
    </StatesContext.Provider>
  )
}
export const useStates = () => {
  const context = useContext(StatesContext)
  if (!context) {
    throw new Error('productStates Provider')
  }
  return context
}