import {
  AddCircle,
  CloseCircle,
  Moneys,
  MoneyTick,
  ProfileCircle,
  Receipt1,
  SearchNormal,
  StatusUp,
  Trash,
  User,
} from 'iconsax-react'
import { useEffect, useState } from 'react'
import AddModal from './AddModal'
import StatCard from './StatCard'
import BeneficiaryCard from './BeneficiaryCard'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { BeneficiaryData } from '@/interfaces'

const PorsantManagement = () => {
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showReportModal, setShowReportModal] = useState<
    boolean | BeneficiaryData
  >(false)
  const [showDeleteState, setShowDeleteState] = useState<boolean>(false)
  const [, setDeleteState] = useState<string[]>([])
  const [searching, setSearching] = useState<string | null>()
  const [beneficiaryList, setBeneficiaryList] = useState<BeneficiaryData[]>([])
  const { setMenu } = useMenu()
  const { beneficiaryData } = useData()
  const { selectedSubGroupData, selectedGroupData, setSelectedGroupData } =
    useStates()
  useEffect(() => {
    if (!selectedGroupData) {
      location.hash = 'porsant'
      setMenu('porsant')
    }
    const filterResult = beneficiaryData?.filter(
      (beneficiary) =>
        beneficiary.supervisor_id === selectedSubGroupData?.supervisor_id
    )
    setBeneficiaryList(filterResult as BeneficiaryData[])
  }, [beneficiaryData, selectedSubGroupData, selectedGroupData, setMenu])
  const filterBeneficiary = (value: string) => {
    const result = beneficiaryData?.filter(
      (beneficiary) =>
        beneficiary.supervisor_id === selectedSubGroupData?.supervisor_id &&
        value.includes(beneficiary.visitor_full_name)
    )
    setBeneficiaryList(result as BeneficiaryData[])
  }
  return (
    <>
      {showAddModal && (
        <AddModal
          groupName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      {showReportModal && (
        <AddModal
          groupName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-12'>
          <div className='flex justify-between '>
            <p>
              <span
                className='text-[#98A2B3] cursor-pointer'
                onClick={() => {
                  setMenu('porsant')
                  location.hash = 'porsant'
                  setSelectedGroupData(null)
                }}>
                مدیریت پورسانت‌دهی
              </span>
              /
              <span
                className='text-[#98A2B3] cursor-pointer'
                onClick={() => {
                  setMenu('porsant')
                  location.hash = 'porsant'
                }}>
                {selectedGroupData?.sup_group_name}
              </span>
              /
              <span className='text-[#7747C0]'>
                {selectedSubGroupData?.supervisor_name}
              </span>
            </p>
          </div>
          {!showDeleteState && (
            <>
              {searching ? (
                <div className='flex w-full justify-end items-center max-w-[60%] gap-2'>
                  <div className='relative w-full flex items-center h-full'>
                    <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                      <SearchNormal size={24} color='gray' />
                    </div>
                    <input
                      type='search'
                      placeholder='جستجو'
                      onChange={(e) => filterBeneficiary(e.target.value)}
                      className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
                    />
                  </div>
                  <CloseCircle
                    size={28}
                    color='#D42620'
                    cursor={'pointer'}
                    onClick={() => setSearching(null)}
                  />
                </div>
              ) : (
                <div className='flex'>
                  <div className='flex gap-3 mx-7'>
                    <button
                      onClick={() => {
                        location.hash = 'allocation'
                        setMenu('allocation')
                      }}
                      className={`bg-[#7747C0] text-white px-5  h-10 rounded-lg`}>
                      تخصیص اعتبار
                    </button>
                    <button
                      onClick={() => {
                        location.hash = 'release'
                        setMenu('release')
                      }}
                      className={`border border-[#7747C0] text-[#7747C0] px-5  h-10 rounded-lg`}>
                      آزادسازی اعتبار
                    </button>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <SearchNormal
                      size={28}
                      color='#2F3237'
                      cursor={'pointer'}
                      onClick={() => setSearching(' ')}
                    />
                    <Receipt1
                      size={28}
                      color='#2F3237'
                      cursor={'pointer'}
                      onClick={() => {
                        location.hash = 'reports'
                        setMenu('reports')
                      }}
                    />
                    <Trash
                      size={28}
                      color='#D42620'
                      cursor={'pointer'}
                      onClick={() => setShowDeleteState(true)}
                    />
                    <AddCircle
                      size={28}
                      color='#0F973D'
                      cursor={'pointer'}
                      onClick={() =>
                        setShowAddModal(
                          selectedGroupData?.sup_group_name as string
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {showDeleteState && (
            <div className='flex gap-3 mx-7'>
              <button
                onClick={() => {
                  setShowDeleteState(false)
                }}
                className={`min-w-40 border border-[#7747C0] text-[#7747C0] px-5  h-10 rounded-lg`}>
                حذف بازاریاب‌ها
              </button>
              <button
                onClick={() => {
                  setShowDeleteState(false)
                }}
                className={`min-w-40 bg-[#7747C0] text-white px-5  h-10 rounded-lg`}>
                انصراف
              </button>
            </div>
          )}
        </div>

        {!showDeleteState && (
          <div className='grid grid-cols-5 max-md:grid-cols-1 max-lg:grid-cols-2 gap-4 mb-6'>
            <StatCard
              title='بازاریاب زیرگروه'
              value={`${selectedSubGroupData?.visitor_count}`}
              Icon={ProfileCircle}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='مبلغ تخصیص داده شده'
              value={`${selectedSubGroupData?.assignment_amount}  ریال`}
              Icon={Moneys}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='تعداد کمپین'
              value={`${selectedSubGroupData?.campaign_count}`}
              Icon={StatusUp}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='مبلغ قابل آزادسازی'
              value={`${selectedSubGroupData?.withdrawable_amount}  ریال`}
              Icon={MoneyTick}
              backgroundImage='/images/green-theme-card.svg'
            />

            <StatCard
              title='ذی‌نفعان'
              value={`${selectedSubGroupData?.visitor_count}`}
              Icon={User}
              backgroundImage='/images/green-theme-card.svg'
            />
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {beneficiaryList?.map((beneficiary, index) => (
            <BeneficiaryCard
              key={index}
              data={beneficiary}
              setDeleteItems={(value: string) =>
                setDeleteState((prv) =>
                  prv.includes(value)
                    ? prv.filter((lastOne) => lastOne !== value)
                    : [...prv, value]
                )
              }
              showDeleteMode={showDeleteState}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default PorsantManagement
