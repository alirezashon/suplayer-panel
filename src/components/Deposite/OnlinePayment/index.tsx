import { useState } from 'react'
import { WalletMoney, CloseCircle, TickCircle, MoneySend } from 'iconsax-react'
import { setComma } from '@/hooks/NumberFormat'
import { errorClass, walletBoxStyle } from '@/app/assets/style'
import { getCookieByKey } from '@/actions/cookieToken'
import { CreateNewIPG, SendPaymentLink } from '@/services/finance'

const OnlinePayment = () => {
  const [formData, setFormData] = useState({
    amount: '',
    phone: '',
    description: '',
  })
  const [error, setError] = useState<string>()
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = async () => {
    if (formData.amount.length < 1) {
      setError('لطفا مبلغ را وارد کنید')
      return
    }
    const accessToken = (await getCookieByKey('access_token')) || ''
    const mobile = (await getCookieByKey('mobile')) || ''

    await CreateNewIPG({
      accessToken,
      data: {
        mobile,
        cust_name: '',
        amount: parseInt(formData?.amount.replace(/,/g, '')),
        order_id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
          (
            (c === 'x'
              ? Math.random() * 16
              : ((Math.random() * 16) & 0x3) | 0x8) | 0
          ).toString(16)
        ),
        description: formData?.description,
        ref_order_id: '',
      },
    }).then(async (result) => {
      if (result)
        await SendPaymentLink({ order_id: result.token }).then((hasLink) => {
          if (hasLink.url) open(hasLink.url)
        })
    })
  }
  return (
    <div className='min-h-screen flex justify-center p-4'>
      <div className='w-full flex bg-white rounded-lg shadow-lg p-6 gap-8'>
        <div className='w-full flex flex-col gap-4'>
          <h2 className='text-gray-700 text-xl font-bold flex items-center gap-2 mr-4'>
            <MoneySend size='24' color='#704CB9' />
            واریز آنلاین
          </h2>

          <div>
            <label
              htmlFor='amount'
              className='block text-gray-600 mb-2 text-right'>
              مبلغ به ریال
            </label>
            <input
              inputMode='numeric'
              value={formData.amount}
              onChange={(e) =>
                handleChange(
                  'amount',
                  setComma(e.target.value.replace(/,/g, ''))
                )
              }
              placeholder='مبلغ خود را به ریال وارد نمایید'
              className={`w-full p-3 border rounded-lg ${
                error && errorClass
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
            />
            {error && <p className='text-red-400'>{error}</p>}
          </div>

          <div className='flex justify-between'>
            {['100000000', '200000000', '300000000'].map((amount) => (
              <button
                key={amount}
                onClick={() => handleChange('amount', amount)}
                className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
                {amount.toLocaleString()} ریال
              </button>
            ))}
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-gray-600 mb-2 text-right'>
              شماره موبایل
            </label>
            <input
              id='phone'
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder='شماره موبایل خود را وارد کنید'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-gray-600 mb-2 text-right'>
              شرح واریز
            </label>
            <textarea
              id='description'
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder='شرح واریز'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              rows={3}
            />
          </div>

          <div className='flex gap-10'>
            <button
              onClick={handleSubmit}
              className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-[#7747C0] hover:bg-[#7747C0] text-white font-bold'>
              <TickCircle size='20' color='#ffffff' variant='Bold' />
              پرداخت
            </button>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#7747C0] border border-600 font-bold'>
              <CloseCircle size='20' color='#704CB9' variant='Bold' />
              انصراف
            </button>
          </div>
        </div>

        <div className='flex flex-col w-full justify-between h-fit mb-6'>
          <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
            <WalletMoney size='20' color='#704CB9' />
            کیف پول
          </h3>
          <div style={walletBoxStyle} className='flex-1 shadow-md'>
            <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
              <WalletMoney size='20' color='#704CB9' />
              کیف پول شما
            </h3>
            <p className='flex justify-between text-gray-500'>
              اعتبار قابل تخصیص <br />
              <span className='text-gray-800 font-semibold text-lg'>
                ۴۰۰۰۰۰ میلیون ریال
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlinePayment
