'use client'
import { PromotionInterface } from '@/interfaces'
import { createContext, useContext, useState, ReactNode } from 'react'

interface PromotionContextProps {
  promotion: PromotionInterface | undefined
  setPromotion: (Promotion: PromotionInterface) => void
}

const PromotionContext = createContext<PromotionContextProps | undefined>(
  undefined
)

export const PromotionProvider = ({ children }: { children: ReactNode }) => {
  const [promotion, setPromotion] = useState<PromotionInterface>()

  return (
    <PromotionContext.Provider value={{ promotion, setPromotion }}>
      {children}
    </PromotionContext.Provider>
  )
}

export const usePromotion = () => {
  const context = useContext(PromotionContext)
  if (!context) {
    throw new Error('promotion Provider')
  }
  return context
}
