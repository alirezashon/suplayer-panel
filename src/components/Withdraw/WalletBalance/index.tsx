import * as React from 'react'
import { WalletInfoProps } from '@/interfaces'
import { MoneySend, Wallet3 } from 'iconsax-react'

export const WalletInfo: React.FC<WalletInfoProps> = ({
  balance,
  availableBalance,
}) => {
    const walletBoxStyle = {
        background:
          'linear-gradient(white, white) padding-box, conic-gradient(rgb(246, 230, 255), #ffffff 18%, #644a9e 31% 43%, rgb(228, 228, 255), #ffffff, #7a5fb7, #e7d9d5, #e4e0ed) border-box',
        border: '3px solid transparent',
        borderRadius: '1vh',
        padding: '1.5rem',
      }

  return (
    <div className={`flex flex-col justify-between  w-full min-h-[74px]`} style={walletBoxStyle}>
      <div className='flex gap-2 items-center   text-sm font-bold text-black w-[211px]'>
       <Wallet3 size={24} color='#704CB9'/>
        <div className='self-stretch my-auto'>کیف پول شما</div>
      </div>
      <div className='flex gap-10 justify-between items-center mt-7 w-full text-xs'>
        <div className='flex gap-2 items-center self-stretch my-auto font-medium text-right text-black text-opacity-60 w-[187px]'>
        <MoneySend size={24} color='#704CB9'/>
          <div className='self-stretch my-auto'>موجودی قابل برداشت</div>
        </div>
        <div className='self-stretch my-auto font-bold text-black'>
          {balance}
        </div>
      </div>
    </div>
  )
}
