'use client'
import React, { useMemo } from 'react'

const DotsLoading = ({
  color = '#ffffff',
  size = 30,
}: {
  color?: string
  size?: number
}) => {
  // تولید آیدی یونیک فقط یک بار در lifecycle کامپوننت
  const uniqueId = useMemo(() => `dots-loader-${Math.random().toString(36).substring(2, 10)}`, [])

  return (
    <>
      <style>
        {`
          .${uniqueId} {
            height: ${size}px;
            aspect-ratio: 2.5;
            --_g: no-repeat radial-gradient(farthest-side, ${color} 90%, #0000);
            background: var(--_g), var(--_g), var(--_g), var(--_g);
            background-size: 20% 50%;
            animation: l43-${uniqueId} 1s infinite linear;
          }

          @keyframes l43-${uniqueId} {
            0%     {background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%}
            16.67% {background-position: calc(0*100%/3) 0,    calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%}
            33.33% {background-position: calc(0*100%/3) 100%, calc(1*100%/3) 0,    calc(2*100%/3) 50%, calc(3*100%/3) 50%}
            50%    {background-position: calc(0*100%/3) 50%, calc(1*100%/3) 100%, calc(2*100%/3) 0,    calc(3*100%/3) 50%}
            66.67% {background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 100%, calc(3*100%/3) 0}
            83.33% {background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 100%}
            100%   {background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%}
          }
        `}
      </style>
      <div id={uniqueId} className={uniqueId}></div>
    </>
  )
}

export default DotsLoading
