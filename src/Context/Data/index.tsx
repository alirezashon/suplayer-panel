'use client'
import {
  Beneficiary,
  GroupData,
  ProductGroupData,
  ProductsData,
  SubGroup,
} from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DataContextProps {
  productData: ProductsData[] | undefined
  setProductData: (ProductData: ProductsData[]) => void
  productGroupData: ProductGroupData[] | undefined
  setProductGroupData: (ProductData: ProductGroupData[]) => void
  groupData: GroupData[] | undefined
  setGroupData: (GroupData: GroupData[]) => void
  subGroupData: SubGroup[] | undefined
  setSubGroupData: (SubGroupData: SubGroup[]) => void
  beneficiaryData: Beneficiary[] | undefined
  setBeneficiaryData: (SubGroupData: Beneficiary[]) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [productData, setProductData] = useState<ProductsData[]>()
  const [productGroupData, setProductGroupData] = useState<ProductGroupData[]>()
  const [groupData, setGroupData] = useState<GroupData[]>()
  const [subGroupData, setSubGroupData] = useState<SubGroup[]>()
  const [beneficiaryData, setBeneficiaryData] = useState<Beneficiary[]>()

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
