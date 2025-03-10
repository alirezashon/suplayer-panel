import {
  DraftsData,
  IDepositForm,
  TransactionInterface,
  WalletDetail,
} from '@/interfaces'

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
      return
    }

    return await response.json()
  } catch (error) {
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
      return
    }

    return await response.json()
  } catch (error) {
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
      return
    }

    return await response.json()
  } catch (error) {
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
      return
    }

    return await response.json()
  } catch (error) {
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
      return
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const GetdDraftImage = async ({
  accessToken,
  file_uid,
}: {
  accessToken: string | undefined
  file_uid: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/checkchequeimage`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          file_uid,
        }),
      }
    )

    if (!response.ok || response.status === 500) {
      return
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const GetTransactions = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<TransactionInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/customers_totalaccount_detail`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      return
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const GetWalletDetail = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<WalletDetail | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/customers_totalaccount`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      return
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const CreateNewIPG = async ({
  data,
  accessToken,
}: {
  data: IDepositForm
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_createipg`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const SendPaymentLink = async ({ order_id }: { order_id: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_sendipg`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id }),
      }
    )
    const datali = await response.json()
    return datali
  } catch (error) {
    console.log(error)
  }
}
