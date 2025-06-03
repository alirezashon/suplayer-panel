import { getCookieByKey } from '@/actions/cookieToken'
import {
  AddDocFile,
  ChangeReleaseStatus,
  ReleaseAllocatedList,
} from '@/services/allocation'
import { generateAllocationSignature } from '@/hooks/Signature'
import {
  ReleaseAllocatedInterface,
  SubGroup,
  GroupData,
  AllocatedListInterface,
  BeneficiaryData,
  FinalReleaseInterface,
  ReleasedListInterface,
} from '@/interfaces'
import { setComma } from '@/hooks/NumberFormat'
import { ReactNode } from 'react'
import {
  getAllocatedList,
  getBeneficiaryData,
  getReleasedList,
  getSubGroupData,
} from '@/actions/setData'
export type TableDataType = Partial<BeneficiaryData> & {
  allocatedAmount: string
  remain_amount: string
  newReleaseAmount: string
  fileId: string
  disable: boolean
}
export const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'اعتبار تخصیص داده شده',
  'اعتبار آزادسازی نشده',
  'آزادسازی اعتبار',
  'بارگذاری فایل محاسبه',
]
export const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-access',
  'text/csv',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'text/html',
  'application/xhtml+xml',
]

export const validateFile = (file: File) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'پسوند فایل قابل قبول نمی‌باشد',
    }
  }

  if (file.size < 50000 || file.size > 2200000) {
    return {
      isValid: false,
      error: 'حجم فایل باید بین 50KB و 2MB باشد',
    }
  }

  return { isValid: true }
}

export const handleDeleteFile = (
  visitorTel: string,
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>,
  setUploadStatuses: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        { status: 'idle' | 'uploading' | 'success' | 'error'; progress: number }
      >
    >
  >
) => {
  setData((prev) =>
    prev.map((item) =>
      item.visitor_tel === visitorTel ? { ...item, fileId: '' } : item
    )
  )
  setUploadStatuses((prev) => ({
    ...prev,
    [visitorTel]: { status: 'idle', progress: 0 },
  }))
}

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const accessToken = (await getCookieByKey('access_token')) || ''
  return await AddDocFile({ src: formData, accessToken })
}

export const createReleaseData = (
  id: string,
  parsedValue: number,
  selectedGroupData: GroupData | null,
  selectedSubGroupData: SubGroup | null,
  allocationList: AllocatedListInterface[]
): ReleaseAllocatedInterface => ({
  commission_type: 1,
  source_type: 1,
  sup_group_code: selectedGroupData?.sup_group_code || '',
  supervisor_code: selectedSubGroupData?.supervisor_code || '',
  visitor_uid: id,
  amount: parsedValue,
  currency_type: 241,
  ref_allocation_uid:
    allocationList.find((allocated) => allocated.visitor_uid === id)
      ?.commission_allocation_uid || '',
  allocation_type: 1,
  Signature: generateAllocationSignature({
    amount: parsedValue.toString(),
    customerMobile: id,
    sup_group_code: selectedGroupData?.sup_group_code || '',
    supervisor_code: selectedSubGroupData?.supervisor_code || '',
    visitor_uid: id,
  }),
})

export const calculateFinalData = ({
  releasedList,
  selectedSubGroupData,
  selectedGroupData,
  setFinalReleaseData,
}: {
  releasedList: ReleasedListInterface[]
  selectedSubGroupData: SubGroup
  selectedGroupData: GroupData
  setFinalReleaseData: (value: FinalReleaseInterface[]) => void
}) => {
  const finalRelease: FinalReleaseInterface[] = []
  const subGroupAllocatedList = releasedList?.filter(
    (release) =>
      release?.wstatus === 0 &&
      release?.supervisor_code === selectedSubGroupData?.supervisor_code
  )
  subGroupAllocatedList?.forEach((row) => {
    if (row) {
      finalRelease.push({
        commission_allocation_uid: row.commission_release_uid,
        status: 1,
        wamount: row.amount,
        allocation_status_id_file: `${row.allocation_status_id_file}`,
        assignment_otp: '',
        Signature: generateAllocationSignature({
          amount: `${row.amount}`,
          customerMobile: row.visitor_uid,
          sup_group_code: selectedGroupData?.sup_group_code as string,
          supervisor_code: selectedSubGroupData?.supervisor_code as string,
          visitor_uid: row.visitor_uid,
        }),
      })
    }
  })
  setFinalReleaseData(finalRelease)
}

export const calculateData = async ({
  allocationList,
  selectedSubGroupData,
  beneficiaryData,
  releasedList,
  setData,
}: {
  allocationList: AllocatedListInterface[]
  selectedSubGroupData: SubGroup
  beneficiaryData: BeneficiaryData[]
  releasedList: ReleasedListInterface[]
  setData: (value: TableDataType[]) => void
}) => {
  if (allocationList.length > 0) {
    const subGroupAllocatedList =
      allocationList?.filter(
        (allocate) =>
          allocate?.supervisor_code === selectedSubGroupData?.supervisor_code
      ) || []
    const allocated = subGroupAllocatedList
      .filter(
        (allocate) => allocate.wstatus === 1 && allocate.remain_amount > 0
      )
      .map((allocate) => ({
        visitor_name:
          beneficiaryData?.find(
            (beneficiary) => beneficiary.visitor_uid === allocate?.visitor_uid
          )?.visitor_name || '',
        visitor_family:
          beneficiaryData?.find(
            (beneficiary) => beneficiary.visitor_uid === allocate?.visitor_uid
          )?.visitor_family || '',
        visitor_tel: allocate.visitor_uid || '',
        allocatedAmount: setComma(`${allocate.allocated_amount}`),
        remain_amount: setComma(`${allocate.remain_amount}`),
        newReleaseAmount:
          releasedList
            ?.filter(
              (release) =>
                release.wstatus === 0 &&
                release.supervisor_code ===
                  selectedSubGroupData?.supervisor_code
            )
            ?.find((final) => final?.visitor_uid === allocate?.visitor_uid)
            ?.amount.toString() || '',
        fileId: '',
        disable: Boolean(
          releasedList
            ?.filter(
              (release) =>
                release.wstatus === 0 &&
                release.supervisor_code ===
                  selectedSubGroupData?.supervisor_code
            )
            ?.find((final) => final?.visitor_uid === allocate?.visitor_uid)
        ),
      }))
    setData(allocated)
  }
}

export const showErrorModal = (
  message: string,
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => void
) => {
  showModal({
    type: 'error',
    main: message,
    title: 'خطا',
    autoClose: 1,
  })
}
export const releasingData = async ({
  releaseData,
  showModal,
  setReleasedList,
  setReleaseData,
  setAllocationList,
  setMenu,
  setSubmitting,
}: {
  releaseData: ReleaseAllocatedInterface[]
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => void
  setReleasedList: (value: ReleasedListInterface[]) => void
  setReleaseData: (value: ReleaseAllocatedInterface[]) => void
  setAllocationList: (value: AllocatedListInterface[]) => void
  setMenu: (value: string) => void
  setSubmitting: (value: boolean) => void
}) => {
  if (releaseData.length < 1) {
    showErrorModal('لیست شما خالی است', showModal)
    return
  }
  setSubmitting(true)
  const accessToken = await getCookieByKey('access_token')
  await ReleaseAllocatedList({ accessToken, data: releaseData }).then(
    async (response) => {
      if (response && response?.status === 1) {
        await getAllocatedList().then(
          (result) => result && setAllocationList(result)
        )
        await getReleasedList().then((result) => {
          if (result) {
            setReleasedList(result)
          }
        })
        showModal({
          type: 'success',
          title: 'موفق',
          main: response?.message,
          autoClose: 1,
        })
        setReleaseData([])
        setMenu('porsantmanagement')
        location.hash = 'porsantmanagement'
        await new Promise((res) => setTimeout(res, 70))
        setMenu('release')
        location.hash = 'release'
      } else
        showErrorModal(response?.message || 'خطای ارتباط با سرور', showModal)
    }
  )
  setSubmitting(false)
}

export const changeReleasedStatus = async ({
  finalReleaseData,
  otp,
  setReleasedList,
  setSubmitting,
  setshowOtpModal,
  setBeneficiaryData,
  selectedSubGroupData,
  setSelectedSubGroupData,
  updateData,
  setMenu,
  showModal,
}: {
  finalReleaseData: FinalReleaseInterface[]
  otp: string | undefined
  setReleasedList: (value: ReleasedListInterface[]) => void
  setSubmitting: (value: boolean) => void
  setshowOtpModal: (value: boolean) => void
  setBeneficiaryData: (value: BeneficiaryData[]) => void
  selectedSubGroupData: SubGroup
  setSelectedSubGroupData: (value: SubGroup) => void
  updateData: () => void
  setMenu: (value: string) => void
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => void
}) => {
  if (finalReleaseData?.length < 1) return
  if (!otp || otp?.length < 5) {
    showModal({
      main: 'کد صحیح نیست',
      title: 'خطا',
      type: 'error',
      autoClose: 1,
      hideButton: true,
    })
    return
  }
  setSubmitting(true)
  const accessToken = (await getCookieByKey('access_token')) || ''
  await ChangeReleaseStatus({
    accessToken,
    status_updates: finalReleaseData.map((allocated) => ({
      ...allocated,
      assignment_otp: `${otp}`,
    })),
  }).then(async (result) => {
    showModal({
      title: result?.status === 1 ? 'موفق' : 'ناموفق',
      type: result?.status === 1 ? 'success' : 'error',
      main: result?.message || 'خطایی رخ داد',
      autoClose: 1,
    })

    setSubmitting(false)
    await getReleasedList().then((result) => {
      if (result) {
        setReleasedList(result)
        setshowOtpModal(false)
      }
    })
    await getBeneficiaryData().then((beneficiaries) => {
      if (beneficiaries) {
        setBeneficiaryData(beneficiaries)
      }
    })
    await getSubGroupData().then((subGroups) => {
      if (subGroups as SubGroup[]) {
        const selected =
          subGroups &&
          subGroups.find(
            (sub) => sub.supervisor_id === selectedSubGroupData?.supervisor_id
          )
        setSelectedSubGroupData(selected as SubGroup)
      }
    })
    updateData()
    setMenu('porsantmanagement')
    location.hash = 'porsantmanagement'
  })
}
