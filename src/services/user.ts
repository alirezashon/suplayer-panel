import { getCookieByKey, IAccessTokenResponse } from '@/actions/cookieToken'
import { IAccountBalanceResponse, IUserResponse } from '@/interfaces'

export interface IAuthenticatedUser {
  access_token: string
  token_type: string
  lastlogin_date: string
  lastlogin_time: string
  last_login_ip: string
  customer_status: string
  user_status: string
  city_level: number
  customer_code: string
  role: string
  approve_status: number
  user_approve_status: number
}

export const UserLoginAPI = async ({
  username,
  password,
}: {
  username: string
  password: string
}): Promise<IAccessTokenResponse | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    })
    if (!response) return
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const GetOtpWithMobile = async ({ mobile }: { mobile: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_getotp/${mobile}`,
      {
        method: 'GET',
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to GetOtpWithMobile!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}

interface IMobileValidatorOtp {
  status: '1' | '-1'
  message: string
}
export const MobileValidatorOtp = async ({
  accessToken,
}: {
  accessToken: string
}): Promise<IMobileValidatorOtp | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_mobile_validator_otp`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to MobileValidatorOtp!')
    }
    if (response.status === 200)
      document.cookie = 'user_status=ACTIVE; path=/auth'

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}

export const MobileValidatorRequest = async ({
  otp_code,
  accessToken,
}: {
  otp_code: string
  accessToken: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_mobile_validator`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ otp_code }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to MobileValidatorRequest!')
    }

    return await response.json()
  } catch (error: unknown) {
    // throw new Error(error as any) // error type?
    console.log(error)
  }
}

export const LoginWithOtpAndMobile = async ({
  mobile,
  otp,
}: {
  mobile: string
  otp: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbw_otplogin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to LoginWithOtpAndMobile!')
    }

    return await response.json()
  } catch (error: unknown) {
    // throw new Error(error as any) // error type?
    console.log(error)
  }
}

export const GetCurrentUser = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<IUserResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/user/me`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
          // authorization: `JWT ${token}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetCurrentUser')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export interface ISignupResponse {
  status: '-1' | '1'
  message: string
}

interface IChangePassword {
  newpassword: string
  otp_code: string
}

export const GetAccountBalance = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<IAccountBalanceResponse[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_accountbalance`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 3600,
          tags: ['sbw_accountbalance'],
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetAccountBalance')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export interface NoneRemovableBalanceResponse {
  manager_uid: string
  amount: string
}
export const GetNoneRemovableBalance = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<NoneRemovableBalanceResponse[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/sbw_Non_removable_balance`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 3600,
          tags: ['sbw_accountbalance'],
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetAccountBalance')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
