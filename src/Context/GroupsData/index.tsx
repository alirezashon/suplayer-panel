'use client'
import { GroupData } from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface GroupDataContextProps {
  groupData: GroupData[] | undefined
  setGroupData: (GroupData: GroupData[]) => void
}

const GroupDataContext = createContext<GroupDataContextProps | undefined>(
  undefined
)

export const GroupDataProvider = ({ children }: { children: ReactNode }) => {
  const [groupData, setGroupData] = useState<GroupData[]>()

  return (
    <GroupDataContext.Provider value={{ groupData, setGroupData }}>
      {children}
    </GroupDataContext.Provider>
  )
}

export const useGroupData = () => {
  const context = useContext(GroupDataContext)
  if (!context) {
    throw new Error('groupData Provider')
  }
  return context
}
