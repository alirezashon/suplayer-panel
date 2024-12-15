'use client'
const Table = ({
  data,
  headers,
  indexOfProfitLoss,
}: {
  data: object[]
  headers: string[]
  indexOfProfitLoss?: number
}) => {
  return (
    <table className='my-10 '>
      <thead>
        <tr>
          {headers.map((head, headIndex) => (
            <th
              className={`bg-[#D7C9EB] border-z h-10 ${
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
        {data.map((account, index) => (
          <tr key={index} className='border-b'>
            {[index + 1, ...[...Object.values(account)]].map(
              (detail, detailIndex) => (
                <td
                  key={detailIndex}
                  className={`text-center h-10 ${
                    detailIndex === indexOfProfitLoss &&
                    `${detail}`.includes('+')
                      ? 'text-green-700'
                      : `${detail}`.includes('-') && 'text-red-600'
                  } ${
                    detailIndex === 0
                      ? 'border-r'
                      : detailIndex === Object.values(account).length  &&
                        'border-l'
                  }`}>
                  {`${detail}` === 'edit' ? (
                    <p className='flex justify-center'>
                      b
                      /
                    </p>
                  ) : (
                    <p
                      className={`${
                        ['پاس شده', 'موفق'].includes(`${detail}`.trim()) &&
                        'bg-[#DAFEE5] text-[#0CAD41] rounded-full '
                      } ${
                        ['پاس نشده', 'ناموفق'].includes(`${detail}`.trim()) &&
                        'bg-[#FEE3E2] text-[#D42620] rounded-full '
                      } ${
                        ['در حال انجام'].includes(`${detail}`.trim()) &&
                        'bg-[#EFE399] text-[#8E5C1A] rounded-full '
                      }`}>
                      {detail}
                    </p>
                  )}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
