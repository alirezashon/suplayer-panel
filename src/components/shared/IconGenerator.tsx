export const CheckMark = ({ color }: { color: string }) => {
    return (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g id='vuesax/outline/tick-circle'>
          <g id='tick-circle'>
            <path
              id='Vector'
              d='M9 17.0625C4.5525 17.0625 0.9375 13.4475 0.9375 9C0.9375 4.5525 4.5525 0.9375 9 0.9375C13.4475 0.9375 17.0625 4.5525 17.0625 9C17.0625 13.4475 13.4475 17.0625 9 17.0625ZM9 2.0625C5.175 2.0625 2.0625 5.175 2.0625 9C2.0625 12.825 5.175 15.9375 9 15.9375C12.825 15.9375 15.9375 12.825 15.9375 9C15.9375 5.175 12.825 2.0625 9 2.0625Z'
              fill={color}
            />
            <path
              id='Vector_2'
              d='M7.93508 11.685C7.78508 11.685 7.64258 11.625 7.53758 11.52L5.41508 9.39745C5.19758 9.17995 5.19758 8.81995 5.41508 8.60245C5.63258 8.38495 5.99258 8.38495 6.21008 8.60245L7.93508 10.3275L11.7901 6.47245C12.0076 6.25495 12.3676 6.25495 12.5851 6.47245C12.8026 6.68995 12.8026 7.04995 12.5851 7.26745L8.33258 11.52C8.22758 11.625 8.08508 11.685 7.93508 11.685Z'
              fill={color}
            />
          </g>
        </g>
      </svg>
    )
  }