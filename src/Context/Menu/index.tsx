"use client"
import { createContext, useContext, useState, ReactNode } from 'react'

interface MenuContextProps {
  menu: string
  setMenu: (Menu: string) => void
}

const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState<string>('')

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider')
  }
  return context
}
