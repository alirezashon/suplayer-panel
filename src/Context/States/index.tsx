'use client'
import { GroupData, SubGroup } from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'
interface StatesContextProps {
  productGroupStates: 'productgroups' | 'product-brands'
  setProductGroupStates: (value: 'productgroups' | 'product-brands') => void
  selectedSubGroupData: SubGroup | undefined
  setSelectedSubGroupData: (SubGroupData: SubGroup) => void
  selectedGroupData: GroupData | undefined | null
  setSelectedGroupData: (SubGroupData: GroupData | null) => void
}
const StatesContext = createContext<StatesContextProps | undefined>(undefined)
export const StatesProvider = ({ children }: { children: ReactNode }) => {
  const [productGroupStates, setProductGroupStates] = useState<
    'productgroups' | 'product-brands'
  >('productgroups')
  const [selectedSubGroupData, setSelectedSubGroupData] = useState<SubGroup>()
  const [selectedGroupData, setSelectedGroupData] = useState<GroupData | null>()
  return (
    <StatesContext.Provider
      value={{
        productGroupStates,
        setProductGroupStates,
        selectedSubGroupData,
        setSelectedSubGroupData,
        selectedGroupData,
        setSelectedGroupData,
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
