// "use client"

// const data = [
//   { value: 60, color: "#36a2eb", label: "آبی" },
//   { value: 40, color: "#fdd835", label: "زرد" },
// ]

// const PureCSSDonutChart = () => {
//   const total = data.reduce((sum, item) => sum + item.value, 0)
//   const gradientParts: string[] = []
//   let currentAngle = 0

//   data.forEach((item) => {
//     const angle = (item.value / total) * 360
//     const nextAngle = currentAngle + angle
//     gradientParts.push(`${item.color} ${currentAngle}deg ${nextAngle}deg`)
//     currentAngle = nextAngle
//   })

//   const gradient = `conic-gradient(${gradientParts.join(", ")})`

//   return (
//     <>
//       <style>{`
// .chart-container {
//   position: relative;
//   perspective: 800px;
//   width: 300px;
//   height: 300px;
//   margin: 80px auto;
// }

// .donut-base,
// .donut-top {
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   mask: radial-gradient(circle at center, transparent 40%, black 41%);
//   -webkit-mask: radial-gradient(circle at center, transparent 40%, black 41%);
//   transform-style: preserve-3d;
//   background: ${gradient};
//   position: absolute;
//   top: 0;
//   left: 0;
// }

// .donut-base {
//   transform: rotateX(60deg) scale(0.92); /* smaller, to go underneath */
//   filter: brightness(0.85);
//   z-index: 1;
// }

// .donut-top {
//   transform: rotateX(60deg);
//   z-index: 2;
// }

// /* لیبل‌ها */
// .label {
//   position: absolute;
//   color: #000;
//   font-weight: bold;
//   font-size: 14px;
//   pointer-events: none;
//   transform: rotateX(60deg) translateZ(1px); /* to appear on top of chart */
// }

// .label-blue {
//   top: 25%;
//   left: 55%;
//   transform: rotateX(60deg) translateZ(1px) translate(-50%, -50%);
//   color: #0366d6;
// }

// .label-yellow {
//   top: 70%;
//   left: 45%;
//   transform: rotateX(60deg) translateZ(1px) translate(-50%, -50%);
//   color: #fbc02d;
// }
//       `}</style>

//       <div className="chart-container">
//         {/* زیرین (کوچکتر، تیره‌تر) */}
//         <div className="donut-base" />
//         {/* رویی (اصلی) */}
//         <div className="donut-top" />
//         {/* لیبل‌ها */}
//         <div className="label label-blue">آبی</div>
//         <div className="label label-yellow">زرد</div>
//       </div>
//     </>
//   )
// }

// export default PureCSSDonutChart

// "use client"

// const data = [
//   { value: 67, color: "#36a2eb", label: "۶۷٪", className: "label-blue" },
//   { value: 33, color: "#fdd835", label: "۳۳٪", className: "label-yellow" },
// ]

// const Donut3DChart = () => {
//   const total = data.reduce((sum, item) => sum + item.value, 0)
//   const gradientParts: string[] = []
//   let currentAngle = 0

//   data.forEach((item) => {
//     const angle = (item.value / total) * 360
//     gradientParts.push(`${item.color} ${currentAngle}deg ${currentAngle + angle}deg`)
//     currentAngle += angle
//   })

//   const gradient = `conic-gradient(${gradientParts.join(", ")})`

//   return (
//     <>
//       <style>{`
//         .chart-container {
//           position: relative;
//           width: 300px;
//           height: 300px;
//           margin: 80px auto;
//           perspective: 1000px;
//         }

//         .donut-layer {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           background: ${gradient};
//           position: absolute;
//           top: 0;
//           left: 0;
//           -webkit-mask: radial-gradient(circle at center, transparent 42%, black 43%);
//           mask: radial-gradient(circle at center, transparent 42%, black 43%);
//           transform: rotateX(55deg) rotateY(0deg) rotateZ(0deg);
//           transform-style: preserve-3d;
//         }

//         .donut-shadow {
//           filter: brightness(0.75);
//           transform: rotateX(55deg) rotateY(0deg) rotateZ(0deg) translateZ(-15px);
//         }

//         .label {
//           position: absolute;
//           font-size: 18px;
//           font-weight: bold;
//           font-family: "Tahoma", sans-serif;
//           transform: rotateX(55deg) rotateY(0deg) rotateZ(0deg) translateZ(1px) translate(-50%, -50%);
//           pointer-events: none;
//         }

//         .label-blue {
//           top: 50%;
//           left: 78%;
//           color: white;
//         }

//         .label-yellow {
//           top: 42%;
//           left: 28%;
//           color: black;
//         }
//       `}</style>

//       <div className="chart-container">
//         <div className="donut-layer donut-shadow" />
//         <div className="donut-layer" />
//         {data.map(({ label, className }) => (
//           <div key={label} className={`label ${className}`}>{label}</div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default Donut3DChart

// "use client"

// const Donut3DChart = () => {
//   return (
//     <>
//       <style>{`
//         .chart-container {
//           position: relative;
//           width: 300px;
//           height: 300px;
//           margin: 80px auto;
//           perspective: 1000px;
//         }

//         .segment {
//           position: absolute;
//           top: 0; left: 0;
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           transform: rotateX(55deg) rotateZ(0deg);
//           transform-style: preserve-3d;
//         }

//         .segment-blue {
//           background: conic-gradient(#36a2eb 0deg 240deg, transparent 240deg 360deg);
//           -webkit-mask: radial-gradient(circle at center, transparent 42%, black 43%);
//           mask: radial-gradient(circle at center, transparent 42%, black 43%);
//           z-index: 2;
//         }

//         .segment-yellow {
//           background: conic-gradient(transparent 0deg 240deg, #fdd835 240deg 360deg);
//           -webkit-mask: radial-gradient(circle at center, transparent 55%, black 56%);
//           mask: radial-gradient(circle at center, transparent 55%, black 56%);
//           z-index: 1;
//           filter: brightness(1);
//         }

//         .segment-shadow {
//           filter: brightness(0.75);
//           transform: rotateX(55deg) rotateZ(0deg) translateZ(-15px);
//         }

//         .label {
//           position: absolute;
//           font-size: 18px;
//           font-weight: bold;
//           font-family: Tahoma, sans-serif;
//           transform: rotateX(55deg) rotateZ(0deg) translateZ(1px) translate(-50%, -50%);
//           pointer-events: none;
//         }

//         .label-blue {
//           top: 48%;
//           left: 76%;
//           color: white;
//         }

//         .label-yellow {
//           top: 32%;
//           left: 30%;
//           color: black;
//         }
//       `}</style>

//       <div className="chart-container">
//         {/* Shadow Layers */}
//         <div className="segment segment-blue segment-shadow" />
//         <div className="segment segment-yellow segment-shadow" />

//         {/* Top Layers */}
//         <div className="segment segment-blue" />
//         <div className="segment segment-yellow" />

//         {/* Labels */}
//         <div className="label label-blue">۶۷٪</div>
//         <div className="label label-yellow">۳۳٪</div>
//       </div>
//     </>
//   )
// }

// export default Donut3DChart

"use client"

interface Donut3DChartProps {
  percentage: number // مثلاً 30 یعنی 30٪ آبی و 70٪ زرد
}

const Donut3DChart = ({ percentage = 60 }: Donut3DChartProps) => {
  const blueDeg = (percentage / 100) * 360
  const yellowDeg = 360 - blueDeg

  return (
    <>
      <style>{`
        .chart-container {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 80px auto;
          perspective: 1000px;
        }

        .segment {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: rotateX(55deg) rotateZ(0deg);
          transform-style: preserve-3d;
        }

        .segment-blue { 
             background: conic-gradient(#36a2eb 0deg ${blueDeg}deg, transparent ${blueDeg}deg 360deg);
          -webkit-mask: radial-gradient(circle at center, transparent 42%, black 43%);
          mask: radial-gradient(circle at center, transparent 42%, black 43%);
          z-index: 2;
        }

        .segment-yellow {
          background: conic-gradient(transparent 0deg ${blueDeg}deg, #fdd835 ${blueDeg}deg 360deg);
          -webkit-mask: radial-gradient(circle at center, transparent 55%, black 56%);
          mask: radial-gradient(circle at center, transparent 55%, black 56%);
          z-index: 1;
        }

        .segment-shadow {
          filter: brightness(0.75);
          transform: rotateX(55deg) rotateZ(0deg) translateZ(-15px);
        }

        .label {
          position: absolute;
          font-size: 18px;
          font-weight: bold;
          font-family: Tahoma, sans-serif;
          transform: rotateX(55deg) rotateZ(0deg) translateZ(1px) translate(-50%, -50%);
          pointer-events: none;
        }

        .label-blue {
          top: 48%;
          left: 76%;
          color: white;
        }

        .label-yellow {
          top: 32%;
          left: 30%;
          color: black;
        }
      `}</style>

      <div className='chart-container'>
        {/* سایه‌ها */}
        <div className='segment segment-blue segment-shadow' />
        <div className='segment segment-yellow segment-shadow' />

        {/* چارت بالا */}
        <div className='segment segment-blue' />
        <div className='segment segment-yellow' />

        {/* لیبل‌ها */}
        <div className='label label-blue'>{percentage}٪</div>
        <div className='label label-yellow'>{100 - percentage}٪</div>
      </div>
    </>
  )
}

export default Donut3DChart

// "use client"

// const data = [
//   { value: 60, color: "#36a2eb", label: "آبی" },
//   { value: 40, color: "#fdd835", label: "زرد" },
// ]

// const PureCSSDonutChart = () => {
//   const total = data.reduce((sum, item) => sum + item.value, 0)
//   const gradientParts: string[] = []
//   let currentAngle = 0

//   data.forEach((item) => {
//     const angle = (item.value / total) * 360
//     const nextAngle = currentAngle + angle
//     gradientParts.push(`${item.color} ${currentAngle}deg ${nextAngle}deg`)
//     currentAngle = nextAngle
//   })

//   const gradient = `conic-gradient(${gradientParts.join(", ")})`

//   return (
//     <>
//       <style>{`
// .chart-container {
//   position: relative;
//   perspective: 900px;
//   width: 320px;
//   height: 320px;
//   margin: 80px auto;
// }

// .donut-base,
// .donut-top {
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   background: ${gradient};
//   position: absolute;
//   top: 0;
//   left: 0;
//   mask: radial-gradient(circle at center, transparent 40%, black 41%);
//   -webkit-mask: radial-gradient(circle at center, transparent 40%, black 41%);
//   transform-style: preserve-3d;
// }

// .donut-base {
//   transform: rotateX(55deg) rotateY(25deg) rotateZ(20deg) scale(0.93);
//   filter: brightness(0.85);
//   z-index: 1;
// }

// .donut-top {
//   transform: rotateX(55deg) rotateY(25deg) rotateZ(20deg);
//   z-index: 2;
// }

// /* لیبل‌ها */
// .label {
//   position: absolute;
//   font-weight: bold;
//   font-size: 14px;
//   pointer-events: none;
//   transform: rotateX(55deg) rotateY(25deg) rotateZ(20deg) translateZ(1px);
// }

// .label-blue {
//   top: 28%;
//   left: 65%;
//   color: #0366d6;
//   transform: rotateX(55deg) rotateY(25deg) rotateZ(20deg) translateZ(1px) translate(-50%, -50%);
// }

// .label-yellow {
//   top: 72%;
//   left: 40%;
//   color: #fbc02d;
//   transform: rotateX(55deg) rotateY(25deg) rotateZ(20deg) translateZ(1px) translate(-50%, -50%);
// }
//       `}</style>

//       <div className="chart-container">
//         <div className="donut-base" />
//         <div className="donut-top" />
//         <div className="label label-blue">آبی</div>
//         <div className="label label-yellow">زرد</div>
//       </div>
//     </>
//   )
// }

// export default PureCSSDonutChart
