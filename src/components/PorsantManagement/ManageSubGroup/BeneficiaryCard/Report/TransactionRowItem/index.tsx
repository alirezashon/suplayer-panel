
const TransactionRowItem = () => {


  return (
 <>
 </>   // <div className='flex items-center max-md:text-[12px] overflow-hidden my-2'>
    //   <button className='!flex !w-full !items-center !justify-between !last-of-type:mb-0 !rounded-lg'>
    //     <div className='flex gap-3 '>
    //       <div className='text-start'>
    //         <div className='flex items-center mb-2'>
    //           <p className='block text-zinc-800 text-nowrap'>
    //             {user_uid !== 'N' ? user_uid : 'پورسانت'}
    //           </p>
    //           <span
    //             className={`ms-2 py-[0.1rem] rounded-md px-2 text-[10px] font-light text-nowrap ${
    //               tstatus === '0'
    //                 ? ttype === 1
    //                   ? 'bg-green-200 text-green-800'
    //                   : ' bg-yellow-200 text-yellow-800'
    //                 : tstatus === '7'
    //                 ? 'bg-yellow-200 text-yellow-800'
    //                 : tstatus === '1'
    //                 ? 'bg-blue-200 text-blue-800'
    //                 : ['3', '2', '8', '87'].includes(`${tstatus}`) &&
    //                   'bg-red-200 text-red-800'
    //             }`}>
    //             {tstatus === '0'
    //               ? ttype === 1
    //                 ? 'موفق'
    //                 : 'در انتظار'
    //               : ['4', '7'].includes(`${tstatus}`)
    //               ? ` در انتظار${ttype === 1 ? ' واریز ' : ' برداشت '}`
    //               : tstatus === '1'
    //               ? 'تسویه شده'
    //               : tstatus === '2'
    //               ? 'لغو شده'
    //               : tstatus === '3'
    //               ? 'حذف شده'
    //               : ['8', '87'].includes(`${tstatus}`) && 'منقضی شده'}
    //           </span>
    //         </div>
    //         <p className='block text-xs text-zinc-600 font-light'>
    //           <span dir='ltr'>
    //             {transactionDate_pe} | {transactionTime}
    //           </span>
    //         </p>
    //       </div>
    //     </div>
    //   </button>

    //   <div className='flex gap-4  items-center justify-center'>
    //     <p className={`text-zinc-700 `}>
    //       <span
    //         dir='ltr'
    //         className={`font-medium ${
    //           ttype === 2 ? 'text-red-500' : 'text-green-600'
    //         }`}>
    //         {ttype === 1 ? '+' : '-'}
    //         {useAddCommasToNumber(Math.abs(parseInt(`${originalAmount}`)))}
    //       </span>
    //       <small
    //         className={`ms-1 ${
    //           ttype === 2 ? 'text-red-500' : 'text-green-600'
    //         }`}>
    //         ریال
    //       </small>
    //     </p>
    //     {tstatus === '8' && hasRecapture && (
    //       <div
    //         onClick={() =>
    //           ReCaptureLink(
    //             `${mobile}`,
    //             `${user_uid}`,
    //             parseInt(`${originalAmount}`),
    //             `${description}`,
    //             `${ref_id}`
    //           )
    //         }
    //         className='text-nowrap flex justify-center items-center rounded-lg p-1 cursor-pointer'
    //         // className='w-[32px] h-[32px] bg-[#2F27CE] text-white flex justify-center items-center rounded-lg p-1 cursor-pointer'
    //       >
    //         <p className='bg-primary text-white max-md:text-[10px] p-1 rounded-lg'>
    //           ارسال مجدد
    //         </p>
    //         {/* <Refresh size={'100%'} /> */}
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}
export default TransactionRowItem
