import { deleteCookieByKey } from "@/actions/cookieToken"
import { CampaignInterface } from "@/interfaces"

export const CreateCampaign = async ({
  cstatus,
  ctitle,
  ctype,
  start_date,
  exp_date,
  budget,
  expected_response,
  expected_amount,
  desc,
  syschart_id,
  pdetails,
  sdetails,
  accessToken,
}: {
  cstatus: number
  ctitle: string
  ctype: number
  start_date: string
  exp_date: string
  budget: number
  expected_response: number
  expected_amount: number
  desc: string
  syschart_id: number
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
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_campaign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          cstatus,
          ctitle,
          ctype,
          start_date,
          exp_date,
          budget,
          expected_response,
          expected_amount,
          desc,
          syschart_id,
          pdetails,
          sdetails,
        }),
      }
    )
    if ([401, 403].includes(response.status)) {
      await deleteCookieByKey("access_token")
      location.href = "/auth/login"
      return
    }
    if (response.status !== 200) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const EditCampaign = async ({
  cstatus,
  ctitle,
  ctype,
  start_date,
  exp_date,
  budget,
  expected_response,
  expected_amount,
  desc,
  campaign_id,
  accessToken,
  hdr_uid,
  syschart_id,
  pdetails,
  sdetails,
}: {
  cstatus: number
  ctitle: string
  ctype: number
  start_date: string
  exp_date: string
  budget: number
  expected_response: number
  expected_amount: number
  desc: string
  campaign_id: number
  hdr_uid: string
  syschart_id: number
  pdetails: {
    pgroup_id: number
    chart_id: number
    product_uid: string
  }[]
  sdetails: {
    sgroup_id: number
    supervisor_id: number
  }[]
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_campaign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          cstatus,
          ctitle,
          ctype,
          start_date,
          exp_date,
          budget,
          expected_response,
          expected_amount,
          desc,
          campaign_id: campaign_id || 0,
          hdr_uid,
          syschart_id,
          pdetails,
          sdetails,
        }),
      }
    )
    if ([401, 403].includes(response.status)) {
      await deleteCookieByKey("access_token")
      location.href = "/auth/login"
      return
    }
    if (response.status !== 200) return
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const GetCampaignList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<CampaignInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_campaign_list`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if ([401, 403].includes(response.status)) {
      await deleteCookieByKey("access_token")
      location.href = "/auth/login"
      return
    }
    if (response.status !== 200) return
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
export const GetUniqueCampaignList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<CampaignInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_campaign_agglist`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if ([401, 403].includes(response.status)) {
      await deleteCookieByKey("access_token")
      location.href = "/auth/login"
      return
    }
    if (response.status !== 200) return
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
