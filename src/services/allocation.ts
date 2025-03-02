import {
  AllocatedListInterface,
  DefineAllocationInterface,
  FinalReleaseInterface,
  ReleaseAllocatedInterface,
  ReleasedListInterface,
  SaveAllocatedDataInterface,
} from '@/interfaces'

export const DefineAllocation = async ({
  allocations,
  accessToken,
}: {
  allocations: DefineAllocationInterface[]
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/batch_prv_commission_allocation`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allocations }),
      }
    )
    if (response.status !== 200) {
      return
    }
    return await response.json()
  } catch (error) {
    error
  }
}
export const ChangeAllocationStatus = async ({
  status_updates,
  accessToken,
}: {
  status_updates: SaveAllocatedDataInterface[]
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/batch_commission_allocation_status`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_updates }),
      }
    )
    if (response.status !== 200) {
      return
    }
    return await response.json()
  } catch (error) {
    error
  }
}
export const ReleaseAllocatedList = async ({
  data,
  accessToken,
}: {
  data: ReleaseAllocatedInterface[]
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/batch_prv_commission_release`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ releases: data }),
      }
    )
    if (response.status !== 200) {
      return
    }
    return await response.json()
  } catch (error) {
    error
  }
}
export const ChangeReleaseStatus = async ({
  status_updates,
  accessToken,
}: {
  status_updates: FinalReleaseInterface[]
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/batch_commission_allocation_status`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_updates }),
      }
    )
    if (response.status !== 200) {
      return
    }
    return await response.json()
  } catch (error) {
    error
  }
}
export const GetAllocatedList = async ({
  accessToken,
}: {
  accessToken: string
}): Promise<AllocatedListInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/commission_allocation_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if (response.status !== 200) {
      return
    }
    const result = await response.json()
    return result.data
  } catch (error) {
    error
  }
}
export const GetReleasedList = async ({
  accessToken,
}: {
  accessToken: string
}): Promise<ReleasedListInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/commission__release_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    if (response.status !== 200) {
      return
    }
    const result = await response.json()
    return result.data
  } catch (error) {
    error
  }
}
export const GetReferrerProductList = async ({
  accessToken,
}: {
  accessToken: string
}) => {
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
    if (response.status !== 200) {
      return
    }

    return await response.json()
  } catch (error) {
    error
  }
}

export const DefineProductoReferrer = async ({
  visitor_uid,
  product_uid,
  accessToken,
}: {
  visitor_uid: string
  product_uid: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_visitor_products_list`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          visitor_uid,
          product_uid,
          status: 1,
          from_date: 'string',
          exp_date: 'string',
        }),
      }
    )

    if (response.status !== 200) {
      return
    }

    return await response.json()
  } catch (error) {
    error
  }
}

export const EditReferrerProduct = async ({
  visitor_products_uid,
  product_uid,
  visitor_uid,
  accessToken,
}: {
  visitor_products_uid: string
  visitor_uid: string
  product_uid: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_visitor_product`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          visitor_products_uid,
          visitor_uid,
          product_uid,
          status: 1,
          from_date: '',
          exp_date: '',
        }),
      }
    )

    if (response.status !== 200) {
      return
    }

    return await response.json()
  } catch (error) {
    error
  }
}

export const AddDocFile = async ({
  src,
  accessToken,
}: {
  src: FormData
  accessToken: string
}): Promise<{ status: string; rec_id_file: string } | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/uploaddocfile`,
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
    error
  }
}
