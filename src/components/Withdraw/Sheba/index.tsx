'use client'
import { IShabaDestinationList } from '@/interfaces'
import ShebaButtonItem from './ShebaButtonItem'
import { ArrowRight2, SearchNormal, Slash } from 'iconsax-react'
import { useCallback, useEffect, useState } from 'react'

const WithdrawSheba = () => {
  const [shebaList, setShebaList] = useState<IShabaDestinationList[]>([])
  const [filteredShebaList, setFilteredShebaList] = useState<
    IShabaDestinationList[]
  >([])

  const [tab, setTab] = useState<number>(0)

  const getShebaList = useCallback(async () => {
    // const accessToken = await getAccessToken()
    // const sheba = await GetShabaDestinationList({ accessToken })
    // if (sheba) {
    //   setShebaList(sheba)
    //   setFilteredShebaList(sheba)
    // }
  }, [setShebaList])

  useEffect(() => {
    !shebaList.length && getShebaList()
  }, [getShebaList, shebaList])
  const searching = (value: string) => {
    // const filteredData = shebaList?.filter(
    //   (item) =>
    //     item.shaba.toString().includes(value) ||
    //     item.bank_name.toString().includes(value) ||
    //     item.fullname.toString().includes(value) ||
    //     item.mobile.toString().includes(value) ||
    //     item.sdtitle.toString().includes(value)
    // )
    // setFilteredShebaList(filteredData)
  }

  return (
    <>
      <div className='flex items-center justify-between gap-2 mb-8 lg:mb-10'>
        <button
          className='font-medium text-primary inline-flex items-center gap-2'
          onClick={() =>
          location.reload()
          }>
          <ArrowRight2 size='24' color='#2f27ce' />
          شماره شبا
        </button>
      </div>

      <div className='relative w-full flex items-center'>
        <div className='absolute right-2 cursor-pointer text-[#50545F]'>
          <SearchNormal size={24} />
        </div>
        <input
          type='search'
          className='w-full h-10 pl-10 pr-9 '
          placeholder='جستجو'
          onChange={(e) => searching(e.target.value)}
        />
      </div>

      <div className='flex items-start self-center w-full text-base text-center max-md:max-w-full my-5'>
        <button
          type='button'
          onClick={() => setTab(0)}
          tabIndex={0}
          className={`flex-1 self-stretch p-2.5 rounded-r-lg ${
            tab === 0 ? 'bg-purple-800 text-white' : 'bg-gray-200 text-zinc-400'
          }`}>
          مقصدهای اخیر
        </button>
        <button
          type='button'
          onClick={() => setTab(1)}
          tabIndex={1}
          className={`flex-1 self-stretch p-2.5 rounded-l-lg ${
            tab === 1 ? 'bg-purple-800 text-white' : 'bg-gray-200 text-zinc-400'
          }`}>
          مقصدهای پر مراجعه
        </button>
      </div>

      {filteredShebaList?.length ? (
        tab === 0 ? (
          filteredShebaList
            ?.slice(-5)
            .map((shaba, index) => (
              <ShebaButtonItem
                key={index}
                bankCode={shaba.bank_code}
                bankName={shaba.bank_name}
                avatar='/images/sample-avatar.jpg'
                username={shaba.fullname || ''}
                shabaNumber={shaba.shaba || ''}
                shabaId={shaba.sid || ''}
                isDraggable={true}
              />
            ))
        ) : (
          filteredShebaList.map((shaba, index) => (
            <ShebaButtonItem
              key={index}
              bankCode={shaba.bank_code}
              bankName={shaba.bank_name}
              avatar='/images/sample-avatar.jpg'
              username={shaba.fullname || ''}
              shabaNumber={shaba.shaba || ''}
              shabaId={shaba.sid || ''}
              isDraggable={true}
            />
          ))
        )
      ) : (
        <p>هنوز موردی ثبت نشده است.</p>
      )}
    </>
  )
}

export default WithdrawSheba
