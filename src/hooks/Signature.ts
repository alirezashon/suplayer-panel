import crypto from 'crypto'

const secretKey =
  'jnCeAJyBgDTJo4MPWHmzoL1wSRy6ZXKbVyy2MthFBv4Drt3yuxdZsSCgFIKYcFNrhWr59hXHvEoGkgKkX7Otx63rMbyIHdUEKO2caskuA0yNezbOSxrtcIuYFUFBZ4bxJk7r1ZFR6llzQnrEzrHBovHY3Stzeh1fWp9dLqabRoRnhjqclAY02PLrsjeFbBWrxf9FGDw0DiIFVq7Blw4ND9Xiy2xYirq8eSiaDKLzPIkYwHycrqBOpZxTXX6Arq1g'
const hmacKey = Buffer.from(secretKey, 'utf-8')

interface IDepositProps {
  amount: string
  customerMobile: string
  cheque_date: string
}

export const generateDepositSignature = ({
  amount,
  cheque_date,
  customerMobile,
}: IDepositProps) => {
  const signString = `${customerMobile}#${amount}#${cheque_date}`
  const stringToSign = Buffer.from(signString, 'utf-8')

  const sign = crypto
    .createHmac('sha512', hmacKey)
    .update(stringToSign)
    .digest('hex')

  return sign
}

export const generateAllocationSignature = ({
  amount,
  customerMobile,
  sup_group_code,
  supervisor_code,
  visitor_uid,
}: {
  amount: string
  customerMobile: string
  sup_group_code: string
  supervisor_code: string
  visitor_uid: string
}) => {
  const signString = `${customerMobile}#${amount}#${sup_group_code}${supervisor_code}${visitor_uid}`
  const stringToSign = Buffer.from(signString, 'utf-8')
  const sign = crypto
    .createHmac('sha512', hmacKey)
    .update(stringToSign)
    .digest('hex')
  return sign
}
