'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
interface StatesContextProps {
  productGroupStates: 'productgroups' | 'product-brands'
  setProductGroupStates: (value: 'productgroups' | 'product-brands') => void
}
const StatesContext = createContext<StatesContextProps | undefined>(undefined)
export const StatesProvider = ({ children }: { children: ReactNode }) => {
  const [productGroupStates, setProductGroupStates] = useState<
    'productgroups' | 'product-brands'
  >('productgroups')
  return (
    <StatesContext.Provider
      value={{
        productGroupStates,
        setProductGroupStates,
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
