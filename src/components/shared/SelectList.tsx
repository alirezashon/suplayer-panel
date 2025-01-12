import { useState } from 'react'

interface SelectListProps {
  label: string
  items: { id: string | number; label: string }[]
  setSelectedItems: (selected: Array<string | number>) => void
}

const SelectList: React.FC<SelectListProps> = ({
  label,
  items,
  setSelectedItems,
}) => {
  const [selectedItems, setSelectedItemsState] = useState<
    Array<string | number>
  >([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleItem = (id: string | number) => {
    let updatedSelectedItems
    if (selectedItems.includes(id)) {
      updatedSelectedItems = selectedItems.filter((item) => item !== id)
    } else {
      updatedSelectedItems = [...selectedItems, id]
    }
    setSelectedItemsState(updatedSelectedItems)
    setSelectedItems(updatedSelectedItems)
  }

  return (
    <div className='relative w-full'>
      <div
        className='border border-gray-300 rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-gray-700'>{label}</span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>

      {isOpen && (
        <div className='absolute w-full border border-gray-300 bg-white rounded-md mt-2 shadow-md z-10'>
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                !selectedItems.includes(item.id) &&
                'text-[#7747C0] hover:bg-gray-100 hover:text-[#7747C0]'
              }`}
              onClick={() => toggleItem(item.id)}>
              <input
                type='checkbox'
                checked={selectedItems.includes(item.id)}
                readOnly
                className={`form-checkbox appearance-none 
    h-5 w-5 border-2  rounded-md
    ${selectedItems.includes(item.id) ? 'bg-[#7747C0]' : 'bg-white'}
  `}
              />

              <span
                className={`${
                  selectedItems.includes(item.id)
                    ? 'text-[#7747C0]'
                    : 'text-gray-700'
                }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectList
