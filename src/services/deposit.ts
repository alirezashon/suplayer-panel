import { DraftsData } from '@/interfaces'

export const AddDraftImage = async ({
  src,
  accessToken,
}: {
  src: FormData
  accessToken: string
}): Promise<{ status: string; rec_id_file: string } | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/uploadchequeimage`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: src,
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to CreateShabaDestination!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const CheckDraftImage = async ({
  id,
  accessToken,
}: {
  id: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/uploadchequeimage`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          file_uid: id,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to CreateShabaDestination!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const ChangeDraftStatus = async ({
  manager_uid,
  cheque_ype,
  cheque_uid,
  cheque_status,
  cheque_status_date,
  status_description,
  accessToken,
}: {
  manager_uid: string
  cheque_ype: number
  cheque_uid: string
  cheque_status: number
  cheque_status_date: string
  status_description: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/uploadchequeimage`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          manager_uid,
          cheque_ype,
          cheque_uid,
          cheque_status,
          cheque_status_date,
          status_description,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to CreateShabaDestination!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const DepositWithDraft = async ({
  cheque_type,
  amount,
  accessToken,
  cheque_number,
  cheque_date,
  cheque_id_file,
  sayad_number,
  cheque_bank,
  cheque_branch,
  shaba_number,
  description,
  Signature,
}: {
  cheque_type: number
  amount: number
  cheque_number: string
  cheque_date: string
  cheque_id_file: string
  sayad_number: string
  cheque_bank: string
  cheque_branch: string
  shaba_number: string
  description: string
  accessToken: string
  Signature: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/deposit_with_cheque`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cheque_type,
          amount,
          cheque_number,
          cheque_date,
          cheque_id_file,
          sayad_number,
          cheque_bank,
          cheque_branch,
          shaba_number,
          description,
          Signature,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to CreateShabaDestination!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetdDraftsList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<DraftsData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/cheque_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetAssistantList')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
