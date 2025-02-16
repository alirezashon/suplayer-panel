import { SearchNormal } from 'iconsax-react'
import { useEffect, useRef, useState } from 'react'

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
  const [filteredItems, setFilteredItems] = useState<
    { id: string | number; label: string }[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    setFilteredItems(items)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [items])
  const filterData = (value: string) => {
    const filterResult = items.filter((item) => item.label.includes(value))
    setFilteredItems(filterResult)
  }
  return (
    <div ref={containerRef} className='relative w-full '>
      <div
        className='border border-gray-300  rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-gray-700'>{selectedItems.length>0 ? selectedItems.join(',') : label}</span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && (
        <div
          style={{ scrollbarWidth: 'none' }}
          className='absolute py-5 max-h-[40vh] overflow-auto w-full border border-gray-300 bg-white   rounded-md mt-2 shadow-md z-10'>
          <div className='sticky top-0  w-full  flex items-center'>
            <div className='absolute left-10 mt-4 z-20 cursor-pointer text-[#50545F]'>
              <SearchNormal size={24} color='gray' />
            </div>
            <input
              type='search'
              placeholder='جستجو'
              onChange={(e) => filterData(e.target.value)}
              className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:shadow-purple-600 focus:shadow-md'
            />
          </div>
          <div className='mt-8'>
            {filteredItems?.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-purple-100 ${
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
            ))}{' '}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectList
