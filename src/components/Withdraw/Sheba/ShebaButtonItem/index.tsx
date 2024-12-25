'use client'
import { IbanInterface } from '@/interfaces'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { bankImages } from '@/components/shared/MatchingBankLogo'
import { useRouter } from 'next/navigation'
import { Slash } from 'iconsax-react'

const ShebaButtonItem = ({
  avatar,
  shabaNumber,
  username,
  isDraggable = false, // New prop for conditional drag
  bankCode,
}: IbanInterface) => {
  // const { withdrawForm, setWithdrawForm } = useKeepWithdrawFormData()
  const [, setShowModal] = useState<boolean>(false)
  const [dragPosition, setDragPosition] = useState<number>(0)
  const [lastDragPosition, setLastDragPosition] = useState<number>(0)
  const [dragging, setDragging] = useState<boolean>(false)
  const startX = useRef<number>(0)
  const router = useRouter()

  const setShebaToGlobalVar = () => {
    router.push(`/${location.pathname.split('/')[1]}/wallet/withdraw`)
    // setWithdrawForm({
    //   ...withdrawForm,
    //   shebaNumber: shabaNumber.slice(2),
    //   shebaId: shabaId,
    //   shebaUsername: username,
    //   bankName:bankName,
    //   bankCode,
    // })
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggable) {
      setDragging(true)
      startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggable) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const dragOffset = clientX - startX.current
      setDragPosition(dragOffset)
      if (dragOffset > -50) setDragging(true)
      else setDragging(false)
    }
  }

  const handleDragEnd = () => {
    if (isDraggable) {
      setDragging(false)
      if (dragPosition !== 0) {
        setLastDragPosition(-90)
        setDragPosition(-90)
      }
      if (lastDragPosition !== 0) {
        setDragPosition(0) // Reset position if threshold not met
        setLastDragPosition(0)
      }
    }
  }

  return (
    <>
      <div
        className='my-4 last-of-type:mb-0 flex items-center overflow-hidden'
        style={{ userSelect: 'none' }}>
        {!dragging && dragPosition !== 0 && (
          <div
            className='bg-red-600 absolute   text-white w-fit whitespace-nowrap text-nowrap flex flex-col items-center p-2 cursor-pointer rounded-lg disable-animate'
            onClick={() => setShowModal(true)}>
            <Slash size={24} />
            <p>غیرفعال کردن</p>
          </div>
        )}
        <div
          onMouseDown={handleDragStart}
          onMouseMove={(e) => e.buttons === 1 && handleDragMove(e)}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onClick={setShebaToGlobalVar}
          style={{
            transform: `translateX(${dragPosition}px)`,
            transition: dragPosition === 0 ? 'transform 0.3s ease' : 'none',
          }}
          className='flex-col !items-start w-full !rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Image
              src={avatar || '/images/sample-avatar.jpg'}
              width={40}
              height={40}
              alt={username || ''}
              title={username || ''}
              className='inline-block rounded-full'
            />
            {bankCode && (
              <Image
                src={bankImages[bankCode] || ''}
                width={20}
                height={20}
                alt={username || ''}
                title={username || ''}
                className='absolute mr-7 mt-7 rounded-full'
              />
            )}
            <p className='text-slate-800 font-normal'>{username || ''}</p>
          </div>
          <p className='text-slate-500 font-light text-start pr-3'>
            {shabaNumber || ''}
          </p>
        </div>
      </div>
    </>
  )
}

export default ShebaButtonItem
