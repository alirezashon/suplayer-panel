import { Cities, County, EducationalDegree, Major, States } from '@/interfaces'

export const GetStates = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<States[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_states`,
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

    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const GetCounty = async ({
  accessToken,
  state,
}: {
  accessToken: string | undefined
  state: string
}): Promise<County[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_county?StateCode=${state}`,
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
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const GetCity = async ({
  accessToken,
  state,
  county,
}: {
  accessToken: string | undefined
  state: string
  county: string
}): Promise<Cities[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/get_city?StateCode=${state}&CountyCode=${county}`,
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

    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
export const GetMajor = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<Major[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/educational_major`,
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
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const GetEducationalDegree = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<EducationalDegree[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/educational_degree`,
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
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
