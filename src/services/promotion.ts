import { deleteCookieByKey } from '@/actions/cookieToken'
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
  accessToken,
  budget,
  pdetails,
  sdetails,
  ldetails,
  distype2,
  promo_start_date,
  promo_start_time,
  promo_exp_date,
  promo_exp_time,
  promo_desc,
}: {
  cstatus: number
  ctitle: string
  start_date: string
  exp_date: string
  cta_link: string
  distype: number
  file_uid: string
  desc: string
  budget: string
  accessToken: string | undefined
  distype2: number
  promo_start_date: string
  promo_start_time: string
  promo_exp_date: string
  promo_exp_time: string
  promo_desc: string

  pdetails: {
    pgroup_id: number
    chart_id: number
    product_uid: string
  }[]
  sdetails: {
    sgroup_id: number
    supervisor_id: number
  }[]
  ldetails: {
    CityUID: string
    CityCode: string
    CountyCode: string
    StateCode: string
  }[]
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
          budget,
          desc,
          pdetails,
          sdetails,
          ldetails,
          distype2,
          promo_start_date,
          promo_start_time,
          promo_exp_date,
          promo_exp_time,
          promo_desc,
        }),
      }
    )

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return
    return await response.json()
  } catch (error) {
    console.log(error)
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
  promotion_id,
  accessToken,
  hdr_uid,
  budget,
  pdetails,
  sdetails,
  ldetails,
}: {
  cstatus: number
  ctitle: string
  start_date: string
  exp_date: string
  cta_link: string
  distype: number
  file_uid: string
  desc: string
  promotion_id: number
  accessToken: string | undefined
  hdr_uid: string
  budget: number
  pdetails: [
    {
      pgroup_id: number
      chart_id: number
      product_uid: string
    }
  ]
  sdetails: [
    {
      sgroup_id: number
      supervisor_id: number
    }
  ]
  ldetails: [
    {
      CityUID: string
      CityCode: string
      CountyCode: string
      StateCode: string
    }
  ]
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
          hdr_uid,
          budget,
          pdetails,
          sdetails,
          ldetails,
        }),
      }
    )
     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.log(error)
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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.log(error)
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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
