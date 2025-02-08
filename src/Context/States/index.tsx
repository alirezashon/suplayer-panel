'use client'
import {
  GroupData,
  ProductGroupData,
  ProductsData,
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
  } | null
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
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

  const showModal = (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
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
