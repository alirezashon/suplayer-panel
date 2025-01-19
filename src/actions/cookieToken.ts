'use server'

import { cookies } from 'next/headers'

export interface IAccessTokenResponse {
  customer_status: string
  access_token: string
  token_type: string
  lastlogin_date: string
  lastlogin_time: string
  last_login_ip: string
  user_status: string
  city_level: number
  customer_code: string
  role: string
  approve_status: number
  user_approve_status: number
  detail?: string
}

export async function setTokenIntoCookie({
  data,
  mobile,
}: {
  data: IAccessTokenResponse
  mobile: string
}) {
  ;(await cookies()).set('access_token', data.access_token, {
    maxAge: (60 * 60) / 2,
    path: '/',
  })
  ;(await cookies()).set('role', data.role)
  ;(await cookies()).set('mobile', mobile)
  ;(await cookies()).set('lastlogin_date', data.lastlogin_date)
  ;(await cookies()).set('lastlogin_time', data.lastlogin_time)
  ;(await cookies()).set('user_status', data.user_status)
  ;(await cookies()).set('clevel', `${data.city_level}`)
  ;(await cookies()).set('approve_status', String(data.user_approve_status))
  setTimeout(() => {
    window.location.href = '/auth/login'
  }, 30 * 60 * 1000)
}

export async function deleteAllCookies() {
  ;(await cookies()).delete('access_token')
  ;(await cookies()).delete('role')
  ;(await cookies()).delete('lastlogin_date')
  ;(await cookies()).delete('lastlogin_time')
  ;(await cookies()).delete('user_status')
  ;(await cookies()).delete('mobile')
  ;(await cookies()).delete('deposit-amount')
  ;(await cookies()).delete('deposit-token')
  ;(await cookies()).delete('deposit-receipt')
}

export async function getAllCookies() {
  return (await cookies()).getAll()
}

export async function getCookieByKey(name: string) {
  return (await cookies()).get(name)?.value
}

interface ITagAndValue {
  key: string
  value: string
}
export async function setCookieByTagAndValue({ key, value }: ITagAndValue) {
  ;(await cookies()).set(key, value)
}
export async function setCookieByTagAndValueAndPath({
  key,
  value,
  path,
}: {
  key: string
  value: string
  path: string
}) {
  ;(await cookies()).set(key, value, {
    path,
  })
}

export async function deleteCookieByKey(key: string) {
  ;(await cookies()).delete(key)
}
