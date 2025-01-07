'use client'
import { SubGroup } from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface SubGroupDataContextProps {
  subGroupData: SubGroup[] | undefined
  setSubGroupData: (SubGroupData: SubGroup[]) => void
}

const SubGroupDataContext = createContext<SubGroupDataContextProps | undefined>(
  undefined
)

export const SubGroupDataProvider = ({ children }: { children: ReactNode }) => {
  const [subGroupData, setSubGroupData] = useState<SubGroup[]>()

  return (
    <SubGroupDataContext.Provider value={{ subGroupData, setSubGroupData }}>
      {children}
    </SubGroupDataContext.Provider>
  )
}

export const useSubGroupData = () => {
  const context = useContext(SubGroupDataContext)
  if (!context) {
    throw new Error('subGroupData Provider')
  }
  return context
}
