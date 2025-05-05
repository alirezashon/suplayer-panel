'use client'

const data = [
  { value: 30, color: '#ff6384' },
  { value: 45, color: '#36a2eb' },
  { value: 25, color: 'purple' },
  { value: 25, color: 'green' },
  { value: 25, color: 'pink' },
  { value: 25, color: '#4caf50' },
  { value: 25, color: 'yellow' },
]

const PureCSSDonutChart = () => {
  // محاسبه درصدها و رنگ‌ها
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const gradientParts: string[] = []
  let currentAngle = 0

  data.forEach((item) => {
    const angle = (item.value / total) * 360
    const nextAngle = currentAngle + angle
    gradientParts.push(`${item.color} ${currentAngle}deg ${nextAngle}deg`)
    currentAngle = nextAngle
  })

  const gradient = `conic-gradient(${gradientParts.join(', ')})`

  return (
    <>
      <style>
        {`.donut-3d {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  mask: radial-gradient(circle at center, transparent 50%, black 51%);
  -webkit-mask: radial-gradient(circle at center, transparent 50%, black 51%);
  transform: rotateX(55deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s;
  margin: 50px auto;
}

.donut-3d:hover {
  transform: rotate(65deg);
}
`}
      </style>
      <div className='donut-3d' style={{ background: gradient }}></div>
    </>
  )
}

export default PureCSSDonutChart

// import { useEffect, useRef } from 'react'
// import Chart from 'chart.js/auto'

// const DonutChart3D = () => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null)
//   const chartInstanceRef = useRef<Chart | null>(null)

//   useEffect(() => {
//     if (chartRef.current) {
//       chartInstanceRef.current = new Chart(chartRef.current, {
//         type: 'doughnut',
//         data: {
//           labels: ['قرمز', 'آبی', 'سبز'],
//           datasets: [
//             {
//               label: 'مقادیر تستی',
//               data: [30, 45, 25],
//               backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
//               borderWidth: 2,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           cutout: '70%',
//           plugins: {
//             legend: {
//               position: 'bottom',
//             },
//           },
//         },
//       })
//     }

//     return () => {
//       chartInstanceRef.current?.destroy()
//     }
//   }, [])

//   return (
//     <div className='chart-container'>
//       <style>
//         {`.chart-container {
//   width: 300px;
//   height: 300px;
//   perspective: 800px;
//   margin: auto;
// }

// .chart-container canvas {
//   transform: rotateX(50deg);
//   transition: transform 0.3s ease;
// }

// `}
//       </style>
//       <canvas ref={chartRef}></canvas>
//     </div>
//   )
// }

// export default DonutChart3D
