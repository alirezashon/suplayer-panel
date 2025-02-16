import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'

interface ExcelRequestBody {
  rows: (string | number)[][]
  font?: {
    name?: string
    size?: number
  }
  headerBgColor?: string
  cellBgColor?: string
  headerFontColor?: string
  cellFontColor?: string
  columnWidths?: number[]
  header: string[]
}

export async function POST(req: NextRequest) {
  try {
    const body: ExcelRequestBody = await req.json()
    const {
      rows,
      font,
      headerBgColor,
      cellBgColor,
      headerFontColor,
      cellFontColor,
      header,
    } = body

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    // Style header row
    const headerRow = worksheet.getRow(1)
    headerRow.values = header
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: headerBgColor || 'FF91D2FF' }, // Header background color
      }
      cell.font = {
        bold: true,
        name: font?.name || 'Tanha',
        size: font?.size || 12,
        color: { argb: headerFontColor || 'FFFFFFFF' }, // Header font color
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center' } // Center text
    })

    // Add and style each data row
    rows.forEach((row, index) => {
      const dataRow = worksheet.addRow(row)
      dataRow.eachCell((cell) => {
        // Apply alternating background colors for data rows
        const bgColor = index % 2 === 0 ? cellBgColor : 'E1E8E7'
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor },
        }
        const fontColor = index % 2 === 0 ? cellFontColor : 'FF05254F'
        cell.font = {
          bold: false,
          name: font?.name || 'Arial',
          size: font?.size || 12,
          color: { argb: fontColor },
        }
        // Align text to center in each cell
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        }
      })
    })

    worksheet.columns.forEach((column) => {
      let maxLength = 0
      // Check if the column and eachCell method exist
      column?.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : ''
        if (cellValue.length > maxLength) {
          maxLength = cellValue.length
        }
      })
      if (column) {
        column.width = maxLength + 5
      }
    })

    // Generate the Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer()
    // Set the response headers and return the buffer as a file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=generated_file.xlsx',
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
    })
  }
}
