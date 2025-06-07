import OtpModal from "@/components/shared/OtpModal"
import { useData } from "@/Context/Data"
import { useMenu } from "@/Context/Menu"
import { useStates } from "@/Context/States"
import { setComma } from "@/hooks/NumberFormat"
import {
  AllocatedListInterface,
  BeneficiaryData,
  FinalReleaseInterface,
  GroupData,
  ReleaseAllocatedInterface,
  ReleasedListInterface,
  SubGroup,
} from "@/interfaces"
import { Printer, SearchNormal } from "iconsax-react"
import { useCallback, useEffect, useState } from "react"
import {
  calculateData,
  calculateFinalData,
  changeReleasedStatus,
  createReleaseData,
  headers,
  releasingData,
  showErrorModal,
} from "./lib/utils"
import FileUploader from "./FileUploader"
import DotsLoading from "@/components/shared/DotsLoading"

type TableDataType = Partial<BeneficiaryData> & {
  allocatedAmount: string
  remain_amount: string
  newReleaseAmount: string
  fileId: string
  disable: boolean
}

const Release = () => {
  const {
    beneficiaryData,
    allocationList,
    releasedList,
    setBeneficiaryData,
    setReleasedList,
    setAllocationList,
  } = useData()
  const {
    showModal,
    selectedSubGroupData,
    selectedGroupData,
    setSelectedGroupData,
    submitting,
    setSubmitting,
    permissions,
    setSelectedSubGroupData,
  } = useStates()
  const { setMenu } = useMenu()
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<
      string,
      { status: "idle" | "uploading" | "success" | "error"; progress: number }
    >
  >({})
  const [releaseData, setReleaseData] = useState<ReleaseAllocatedInterface[]>(
    []
  )
  const [finalReleaseData, setFinalReleaseData] = useState<
    FinalReleaseInterface[]
  >([])
  const [data, setData] = useState<TableDataType[]>([])
  const [otp, setOtp] = useState<string>()
  const [showOtpModal, setshowOtpModal] = useState<boolean>(false)

  const updateData = useCallback(() => {
    calculateData({
      allocationList: allocationList as AllocatedListInterface[],
      selectedSubGroupData: selectedSubGroupData as SubGroup,
      beneficiaryData: beneficiaryData as BeneficiaryData[],
      releasedList: releasedList as ReleasedListInterface[],
      setData,
    })
    calculateFinalData({
      releasedList: releasedList as ReleasedListInterface[],
      selectedSubGroupData: selectedSubGroupData as SubGroup,
      selectedGroupData: selectedGroupData as GroupData,
      setFinalReleaseData,
    })
  }, [
    allocationList,
    beneficiaryData,
    releasedList,
    selectedGroupData,
    selectedSubGroupData,
  ])
  useEffect(() => {
    if (!selectedGroupData) {
      location.hash = "porsant"
      setMenu("porsant")
    }
    updateData()
  }, [setMenu, selectedGroupData, updateData])
  const handleDeleteFile = (visitorTel: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.visitor_tel === visitorTel ? { ...item, fileId: "" } : item
      )
    )
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: "idle", progress: 0 },
    }))
  }

  const handleUploadStart = (visitorTel: string) => {
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: "uploading", progress: 0 },
    }))
  }

  const handleUploadProgress = (visitorTel: string, progress: number) => {
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: "uploading", progress },
    }))
  }

  const handleUploadSuccess = (visitorTel: string, fileId: string) => {
    setData((prev) =>
      prev.map((last) =>
        last.visitor_tel === visitorTel ? { ...last, fileId } : last
      )
    )
    setFinalReleaseData((prev) =>
      prev.map((last) =>
        releasedList?.find(
          (release) =>
            release.commission_release_uid === last.commission_allocation_uid
        )?.visitor_uid === visitorTel
          ? { ...last, allocation_status_id_file: fileId }
          : last
      )
    )
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: "success", progress: 100 },
    }))
  }

  const handleUploadError = (visitorTel: string, error: string) => {
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: "error", progress: 0 },
    }))
    showErrorModal(error, showModal)
  }

  const handleCreditChange = (id: string, value: string) => {
    const cleanValue = value.replace(/,/g, "")
    if (!/^\d*$/.test(cleanValue)) return

    const parsedValue = cleanValue ? parseInt(cleanValue, 10) : ""
    setData((prev) => {
      const updatedData = prev.map((last) =>
        last.visitor_tel === id
          ? {
              ...last,
              newReleaseAmount: parsedValue !== "" ? `${parsedValue}` : "",
            }
          : last
      )
      return updatedData
    })

    setReleaseData((prev) => {
      const existingIndex = prev.findIndex((item) => item.visitor_uid === id)

      if (parsedValue === "") {
        return prev.filter((item) => item.visitor_uid !== id)
      }

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, amount: parsedValue } : item
        )
      }

      return [
        ...prev,
        createReleaseData(
          id,
          parsedValue,
          selectedGroupData || null,
          selectedSubGroupData || null,
          allocationList ?? []
        ),
      ]
    })
  }

  return (
    <>
      {permissions[1].includes("748") && (
        <div className='m-4'>
          {showOtpModal && !submitting && (
            <OtpModal
              setOtp={setOtp}
              title='ثبت نهایی آزادسازی اعتبار'
              close={() => setshowOtpModal(false)}
              submit={() =>
                changeReleasedStatus({
                  finalReleaseData,
                  otp,
                  setReleasedList,
                  setSubmitting,
                  setshowOtpModal,
                  setBeneficiaryData,
                  selectedSubGroupData: selectedSubGroupData as SubGroup,
                  updateData,
                  setSelectedSubGroupData,
                  setMenu,
                  showModal,
                })
              }
            />
          )}
          <div className='flex justify-between items-center mb-7'>
            <p>
              <span
                className='text-[#98A2B3] cursor-pointer'
                onClick={() => {
                  setMenu("porsant")
                  location.hash = "porsant"
                  setSelectedGroupData(null)
                }}
              >
                مدیریت پورسانت‌دهی/
              </span>
              <span
                className='text-[#98A2B3] cursor-pointer'
                onClick={() => {
                  setMenu("porsant")
                  location.hash = "porsant"
                }}
              >
                {selectedGroupData?.sup_group_name}/
              </span>
              <span
                className='text-[#98A2B3] cursor-pointer'
                onClick={() => {
                  setMenu("porsantmanagement")
                  location.hash = "porsantmanagement"
                }}
              >
                {selectedSubGroupData?.supervisor_name}/
              </span>
              <span className='text-[#7747C0]'>آزادسازی گروهی</span>
            </p>
          </div>
          <div className='flex flex-col bg-white p-3'>
            <div className='flex flex-col'>
              <p className='text-[#8455D2]'>آزادسازی اعتبار تخصیص داده شده</p>

              <div className='flex gap-5 items-center'>
                <div className='relative w-full flex items-center'>
                  <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                    <SearchNormal size={24} color='gray' />
                  </div>

                  <input
                    type='search'
                    placeholder='جستجو'
                    className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
                  />
                </div>
                <button
                  type='submit'
                  className='border-button w-56 px-10 h-10 rounded-lg'
                >
                  جستجو
                </button>
              </div>
              <div className='m-4'>
                <table className='my-10 w-full border-collapse border rounded-lg overflow-hidden'>
                  <thead>
                    <tr>
                      {headers.map((head, headIndex) => (
                        <th
                          className={`bg-[#F5F7F8] border-z h-10 ${
                            headIndex === 0
                              ? "rounded-tr-lg"
                              : headIndex === headers.length - 1 &&
                                "rounded-tl-lg"
                          } `}
                          key={headIndex}
                        >
                          <p
                            className={`flex justify-center items-center border-y h-10  ${
                              headIndex === 0
                                ? "border-r rounded-tr-lg"
                                : headIndex === headers.length - 1 &&
                                  "border-l rounded-tl-lg"
                            }`}
                          >
                            {head}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      data?.map((row, index) => (
                        <tr key={index} className='border-b'>
                          <td className='text-center px-4 py-2 border-r'>
                            {index + 1}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row.visitor_name}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row.visitor_family}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row?.allocatedAmount} ریال
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row?.remain_amount} ریال
                          </td>
                          <td className='text-center px-4 py-2'>
                            <input
                              inputMode='numeric'
                              maxLength={21}
                              value={setComma(row.newReleaseAmount)}
                              disabled={row?.disable}
                              onChange={(e) => {
                                const result =
                                  parseInt(
                                    row.remain_amount.replace(/,/g, "")
                                  ) >=
                                  parseInt(e.target.value.replace(/,/g, ""))
                                    ? e.target.value
                                    : row.remain_amount
                                handleCreditChange(`${row.visitor_tel}`, result)
                              }}
                              className='border-none rounded px-2 py-1 w-full text-center'
                              placeholder='مبلغ آزادسازی را وارد کنید'
                            />
                          </td>
                          <td className='text-center px-4 py-2 border-l'>
                            <FileUploader
                              visitorTel={row.visitor_tel as string}
                              fileId={row.fileId}
                              disable={row.disable}
                              uploadStatus={
                                uploadStatuses[row.visitor_tel as string] || {
                                  status: "idle",
                                  progress: 0,
                                }
                              }
                              onUploadStart={handleUploadStart}
                              onUploadProgress={handleUploadProgress}
                              onUploadSuccess={handleUploadSuccess}
                              onUploadError={handleUploadError}
                              onDelete={handleDeleteFile}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className='flex items-center justify-between'>
                  <div className='flex text-[#7747C0] cursor-pointer'>
                    <Printer size={22} color='#7747C0' />
                    <p>چاپ لیست</p>
                  </div>
                  <div className='flex mt-4 gap-5 justify-end'>
                    <button
                      disabled={submitting}
                      onClick={() =>
                        releasingData({
                          releaseData,
                          showModal,
                          setReleasedList,
                          setSubmitting,
                          setReleaseData,
                          setAllocationList,
                          setMenu,
                        })
                      }
                      className='flex justify-center  items-center border-button px-10 h-10 rounded-lg  w-full text-nowrap min-w-60'
                    >
                      {submitting ? (
                        <DotsLoading color='#7747C0' />
                      ) : (
                        "ذخیره پیش نویس آزادسازی"
                      )}
                    </button>
                    <button
                      disabled={submitting}
                      onClick={() => {
                        if (finalReleaseData.length > 0) setshowOtpModal(true)
                        else
                          showModal({
                            type: "error",
                            main: "ابتدا لیست را در پیش نویس ذخیره کنید",
                            title: "خطا",
                            autoClose: 1,
                          })
                      }}
                      className='flex justify-center items-center fill-button px-10 h-10 rounded-lg w-full  text-nowrap min-w-60'
                    >
                      {submitting ? (
                        <DotsLoading color='#ffffff' />
                      ) : (
                        "ثبت نهایی"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Release
