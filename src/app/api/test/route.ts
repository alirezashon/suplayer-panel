// import crypto from 'crypto'

// const encryptedBase64 = `
// +xbDSyCMHp3qTbqpSi/wRSDsrVfBBWVRny6vrV0lnAI4hBFWjw2oCfJvlM5TLphUXpJ1Yd8QedaAF0bpySjzOWNzO7p58TWF0Cehst9LCRmoNx4AzTGutR/KwXedKqqUffV3kCygKHU+T5/vilfBL9nBPSWSXdBuTV3yJ+Hu01xFaloQX/2l1w3z/Uwxqei2d4QHQmjz5D5Xcaotmq4+NIJZ6WB16jIyGy7IkX8JwcTyajCaJzcsc/2RWzsY7mjrm3z9dsTNOwqJ8BoucHIdfFsOGlGRTOP4gYNpxxKlwxlgQNwaWQ1jr7B4mc1wU5zv/TgwIHtQS+i2slWmmWT8ud3zdBUxmV4vrTG26o4C2K++xdvxBnvMwomKTZowqqh6s80O/wNRHcZHXGXIB2HiPozlJyaCOrvoZ167xO7FuqwzpJEqPjoiHDxgpk4R1FkCGyZjYSkcT1v4JDut/O+Y1eiWxSL0C6VRP5QRn2+xlTkNzBrSc5AHd6O5I+WKx3A/vJu4ubCM6x1CpwbB0s//8nNNB3rnSo3Q9BDM/2DSeIGRX6jtgLuoujzT6cFt0fo8pgmqTfL58Ie/dgvXLk8PV6AqMCZh9w6cn9s17ttOQ2RZ68O8jEBme2eyvMKj0Byp
// `

// const key = Buffer.from('693474BV59267U30', 'utf8') // 16-byte key
// const iv = Buffer.from('619Y0M168Q582558', 'utf8') // 16-byte IV

// // رمزگشایی
// const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
// let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8')
// decrypted += decipher.final('utf8')

// console.log('Decrypted:', decrypted)

import {NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  try {
    const encryptedBase64 = `
+xbDSyCMHp3qTbqpSi/wRSDsrVfBBWVRny6vrV0lnAI4hBFWjw2oCfJvlM5TLphUXpJ1Yd8QedaAF0bpySjzOWNzO7p58TWF0Cehst9LCRmoNx4AzTGutR/KwXedKqqUffV3kCygKHU+T5/vilfBL9nBPSWSXdBuTV3yJ+Hu01xFaloQX/2l1w3z/Uwxqei2d4QHQmjz5D5Xcaotmq4+NIJZ6WB16jIyGy7IkX8JwcTyajCaJzcsc/2RWzsY7mjrm3z9dsTNOwqJ8BoucHIdfFsOGlGRTOP4gYNpxxKlwxlgQNwaWQ1jr7B4mc1wU5zv/TgwIHtQS+i2slWmmWT8ud3zdBUxmV4vrTG26o4C2K++xdvxBnvMwomKTZowqqh6s80O/wNRHcZHXGXIB2HiPozlJyaCOrvoZ167xO7FuqwzpJEqPjoiHDxgpk4R1FkCGyZjYSkcT1v4JDut/O+Y1eiWxSL0C6VRP5QRn2+xlTkNzBrSc5AHd6O5I+WKx3A/vJu4ubCM6x1CpwbB0s//8nNNB3rnSo3Q9BDM/2DSeIGRX6jtgLuoujzT6cFt0fo8pgmqTfL58Ie/dgvXLk8PV6AqMCZh9w6cn9s17ttOQ2RZ68O8jEBme2eyvMKj0Byp
`

    const key = Buffer.from('693474BV59267U30', 'utf8') // 16-byte key
    const iv = Buffer.from('619Y0M168Q582558', 'utf8') // 16-byte IV

    // رمزگشایی
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    console.log('Decrypted:', decrypted)

    const data = JSON.parse(decrypted)
    console.warn(data)
    const keys = Object.keys(data)
    const values = Object.values(data)

    const csv = `${keys.join(',')}\n${values.join(',')}`
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="data.csv"',
      },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'خطا در رمزگشایی یا ساخت فایل',
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
