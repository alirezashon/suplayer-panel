import { PromotionInterface } from '@/interfaces'
export const CreatePromotion = async ({
  cstatus,
  ctitle,
  start_date,
  exp_date,
  cta_link,
  distype,
  file_uid,
  desc,
  sgroup_id,
  supervisor_id,
  pgroup_id,
  chart_id,
  product_uid,
  accessToken,
}: {
  cstatus: number
  ctitle: string
  start_date: string
  exp_date: string
  cta_link: string
  distype: number
  file_uid: string
  desc: string
  sgroup_id: number
  supervisor_id: number
  pgroup_id: number
  chart_id: number
  product_uid: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_promotion`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          cstatus,
          ctitle,
          start_date,
          exp_date,
          cta_link,
          distype,
          file_uid,
          desc,
          sgroup_id,
          supervisor_id,
          pgroup_id,
          chart_id,
          product_uid,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  }catch (error) {
    error
  }
}
export const EditProductPromotion = async ({
  cstatus,
  ctitle,
  start_date,
  exp_date,
  cta_link,
  distype,
  file_uid,
  desc,
  sgroup_id,
  supervisor_id,
  pgroup_id,
  chart_id,
  product_uid,
  promotion_id,
  accessToken,
}: {
  cstatus: number
  ctitle: string
  start_date: string
  exp_date: string
  cta_link: string
  distype: number
  file_uid: string
  desc: string
  sgroup_id: number
  supervisor_id: number
  pgroup_id: number
  chart_id: number
  product_uid: string
  promotion_id: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_promotion`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          promotion_id,
          cstatus,
          ctitle,
          start_date,
          exp_date,
          cta_link,
          distype,
          file_uid,
          desc,
          sgroup_id,
          supervisor_id,
          pgroup_id,
          chart_id,
          product_uid,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  }catch (error) {
    error
  }
}
export const GetPromotionList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<PromotionInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_promotion_list`,
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
    error
  }
}

export const AddPromotionImage = async ({
  src,
  accessToken,
}: {
  src: FormData
  accessToken: string
}): Promise<{ status: string; rec_id_file: string } | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/uploadpromotionimage`,
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
  }catch (error) {
    error
  }
}

export const CheckPromotionImage = async ({
  id,
  accessToken,
}: {
  id: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/checkpromotionimage`,
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
  }catch (error) {
    error
  }
}
