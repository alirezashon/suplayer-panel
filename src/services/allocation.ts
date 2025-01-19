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
  } catch (error: unknown) {
    console.log(error)
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
  } catch (error: unknown) {
    console.log(error)
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
  } catch (error: unknown) {
    console.log(error)
  }
}
