import { IDepositForm } from "@/interfaces"

export interface ICreateNewIPG {
  status: '1' | '-1'
  token: string
  payment_amount: number
  payment_url: string
  message?:string
  ref_order_id?:string
}

export const CreateNewIPG = async ({
  data,
  accessToken,
}: {
  data: IDepositForm
  accessToken: string
}): Promise<ICreateNewIPG | undefined> => {
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

    if (response.status !== 200) {
      throw new Error('Failed to CreateNewIPG!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}

export const SendPaymentLink = async ({
  order_id,
}: {
  order_id: string
})=> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_sendipg`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({order_id}),
      }
    )

    if (response.status !== 200) {
      throw new Error('خطا در ارسال لینک پرداخت')
    }

    const datali = await response.json()
    return datali
  } catch (error) {
    console.log(error)
  }
}
