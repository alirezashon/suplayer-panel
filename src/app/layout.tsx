'use state'
import type { Metadata } from 'next'
import './assets/globals.css'
import { MenuProvider } from '@/Context/Menu'
import { PromotionProvider } from '@/Context/Promotion'
import ToastProvider from '../../providers/ToastProvider'
import { DataProvider } from '@/Context/Data'

export const metadata: Metadata = {
  title: ' ',
  description: ' ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PromotionProvider>
      <MenuProvider>
        <DataProvider>
          <html lang='en'>
            <body>
              <ToastProvider />
              {children}
            </body>
          </html>
        </DataProvider>
      </MenuProvider>
    </PromotionProvider>
  )
}
