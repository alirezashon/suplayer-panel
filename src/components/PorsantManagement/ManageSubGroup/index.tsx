import {
  AddCircle,
  Moneys,
  MoneyTick,
  ProfileCircle,
  StatusUp,
  Trash,
  User,
} from 'iconsax-react'
import { useState } from 'react'
import AddModal from './AddModal'
import StatCard from './StatCard'
import DoctorCard from './ReferrerCard'

const PorsantManagement = () => {
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteState, setShowDeleteState] = useState<boolean>(false)
  const [, setDeleteState] = useState<string[]>([])
  return (
    <>
      {showAddModal && (
        <AddModal
          groupName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex justify-between items-center mb-7'>
            <p>
              <span className='text-[#98A2B3]'>مدیریت پورسانت‌دهی </span> /
              <span className='text-[#98A2B3]'>گروه من </span>/
              <span className='text-[#7747C0]'>منطقه ۵</span>
            </p>
          </div>
          {!showDeleteState && (
            <div className='flex'>
              <div className='flex gap-3 mx-7'>
                <button
                  className={`bg-[#7747C0] text-white px-5  h-10 rounded-lg`}>
                  تخصیص اعتبار
                </button>
                <button
                  className={`border border-[#7747C0] text-[#7747C0] px-5  h-10 rounded-lg`}>
                  آزادسازی اعتبار
                </button>
              </div>
              <div className='flex gap-1'>
                <Trash
                  size={24}
                  color='#D42620'
                  cursor={'pointer'}
                  onClick={() => setShowDeleteState(true)}
                />
                <AddCircle
                  size={24}
                  color='#0F973D'
                  cursor={'pointer'}
                  onClick={() => setShowAddModal('تهران غرب')}
                />
              </div>
            </div>
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
              value='محمد کوشکی'
              Icon={ProfileCircle}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='مبلغ تخصیص داده شده'
              value='۳۰,۰۰۰ میلیون ریال'
              Icon={Moneys}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='کمپین افق دارو'
              value='کمپین افق دارو'
              Icon={StatusUp}
              backgroundImage='/images/red-theme-card.svg'
            />
            <StatCard
              title='مبلغ قابل آزادسازی'
              value='۴۰,۰۰۰ میلیون ریال'
              Icon={MoneyTick}
              backgroundImage='/images/green-theme-card.svg'
            />

            <StatCard
              title='ذی‌نفعان'
              value=' کوشکی'
              Icon={User}
              backgroundImage='/images/green-theme-card.svg'
            />
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <DoctorCard
              key={index}
              data={{
                title: 'دکتر محدثه عالی',
                allocation: '۴۰۰۰ میلیون ریال',
                lastAllocation: '۲۰۰۰ میلیون ریال',
                released: '۲۰۰۰ میلیون ریال',
              }}
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
