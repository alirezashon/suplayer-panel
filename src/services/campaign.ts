import { CampaignInterface } from '@/interfaces'

export const CreateCampaign = async ({
  cstatus,
  ctitle,
  ctype,
  start_date,
  exp_date,
  loc_type,
  loc_uid,
  budget,
  expected_response,
  expected_amount,
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
  ctype: number
  start_date: string
  exp_date: string
  loc_type: number
  loc_uid: string
  budget: number
  expected_response: number
  expected_amount: number
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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_campaign`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          cstatus,
          ctitle,
          ctype,
          start_date,
          exp_date,
          loc_type,
          loc_uid,
          budget,
          expected_response,
          expected_amount,
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
export const EditProductCampaign = async ({
  cstatus,
  ctitle,
  ctype,
  start_date,
  exp_date,
  loc_type,
  loc_uid,
  budget,
  expected_response,
  expected_amount,
  desc,
  sgroup_id,
  supervisor_id,
  pgroup_id,
  chart_id,
  product_uid,
  campaign_id,
  accessToken,
}: {
  cstatus: number
  ctitle: string
  ctype: number
  start_date: string
  exp_date: string
  loc_type: number
  loc_uid: string
  budget: number
  expected_response: number
  expected_amount: number
  desc: string
  sgroup_id: number
  supervisor_id: number
  pgroup_id: number
  chart_id: number
  product_uid: string
  campaign_id: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_campaign`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          campaign_id: campaign_id || 0,
          cstatus,
          ctitle,
          ctype,
          start_date,
          exp_date,
          loc_type,
          loc_uid,
          budget,
          expected_response,
          expected_amount,
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
export const GetCampaignList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<CampaignInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_campaign_list`,
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
