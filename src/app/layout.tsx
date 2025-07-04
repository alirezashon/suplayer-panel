import type { Metadata } from 'next'
import './assets/globals.css'
import { MenuProvider } from '@/Context/Menu'
import { PromotionProvider } from '@/Context/Promotion'
import { DataProvider } from '@/Context/Data'
import { StatesProvider } from '@/Context/States'

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
        <StatesProvider>
          <DataProvider>
            <html lang='en'>
              <body>{children}</body>
            </html>
          </DataProvider>
        </StatesProvider>
      </MenuProvider>
    </PromotionProvider>
  )
}
