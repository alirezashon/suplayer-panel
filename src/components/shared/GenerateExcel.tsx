'use client'
import { ExportCurve } from 'iconsax-react'
import { useState } from 'react'
import Loading from './Loading'
const ExcelGenerator = ({
  rows,
  header,
}: {
  rows: (string | number)[][]
  header: string[]
}) => {
  const [loading, setLoading] = useState(false)
  const generateExcel = async () => {
    setLoading(true)
    const requestData = {
      rows,
      font: { name: 'Calibri', size: 12 },
      headerBgColor: '2F27CE',
      cellBgColor: 'FFFFFF',
      headerFontColor: 'FFFFFF',
      cellFontColor: '2F27CE',
      columnWidths: [20, 10, 30],
      header,
    }
    try {
      const response = await fetch('/api/GenerateCustomExcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `report${new Date().toString().split(' G')[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ExportCurve onClick={generateExcel} size='32' color='#ffffff' />
      )}
    </div>
  )
}
export default ExcelGenerator
