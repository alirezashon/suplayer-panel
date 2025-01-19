'use client'

import { getCookieByKey } from '@/actions/cookieToken'
import { GetdDraftImage } from '@/services/deposit'
import { Import, MoreSquare } from 'iconsax-react'

const Table = ({
  data,
  headers,
  indexOfProfitLoss,
}: {
  data: object[]
  headers: string[]
  indexOfProfitLoss?: number
}) => {
  const downloadDraftImage = async (id: string) => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    console.log(id)
    await GetdDraftImage({ accessToken, file_uid: id }).then((response) => {
      const blob = new Blob([response], { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'draft-image.jpg'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    })
  }
  return (
    <table className='my-10 '>
      <thead>
        <tr>
          {headers.map((head, headIndex) => (
            <th
              className={`bg-[#F5F7F8] border-z h-10 ${
                headIndex === 0
                  ? 'rounded-tr-lg'
                  : headIndex === headers.length - 1 && 'rounded-tl-lg'
              } `}
              key={headIndex}>
              <p
                className={`flex justify-center items-center border-y h-10  ${
                  headIndex === 0
                    ? 'border-r rounded-tr-lg'
                    : headIndex === headers.length - 1 &&
                      'border-l rounded-tl-lg'
                }`}>
                {head}
              </p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((account, index) => (
          <tr key={index} className='border-b'>
            {Object.values(account).map((detail, detailIndex) => (
              <td
                key={detailIndex}
                className={`text-center h-10  ${
                  detailIndex === 0 && 'border-r'
                }`}>
                <p
                  className={`${
                    ['پاس شده', 'موفق'].includes(`${detail}`.trim()) &&
                    'bg-[#DAFEE5] text-[#0CAD41] rounded-full'
                  } ${
                    ['پاس نشده', 'ناموفق'].includes(`${detail}`.trim()) &&
                    'bg-[#FEE3E2] text-[#D42620] rounded-full'
                  } ${
                    ['در حال انجام'].includes(`${detail}`.trim()) &&
                    'bg-[#EFE399] text-[#8E5C1A] rounded-full'
                  }`}>
                  {detailIndex !== 9 ? (
                    detail
                  ) : (
                    <span className='flex justify-center'>
                      <Import
                      onClick={()=>downloadDraftImage(detail)}
                        size={24}
                        color='#7747C0'
                        className='cursor-pointer'
                      />
                    </span>
                  )}
                </p>
              </td>
            ))}

            <td className='b'>
              <p className='flex justify-center'>
                <MoreSquare
                  size={24}
                  color='#7747C0'
                  className='cursor-pointer'
                />
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
