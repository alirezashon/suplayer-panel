import { ArrowDown2, CloseCircle, SearchNormal } from 'iconsax-react'
import React, { useEffect, useRef, useState } from 'react'

interface Option {
  id: number
  label: string
  children?: Option[]
}

interface MultiLevelSelectProps {
  data: Option[]
  onSelectionChange: (selected: {
    level1: number[]
    level2: number[]
    level3: number[]
  }) => void
}

const MultiLevelSelect: React.FC<MultiLevelSelectProps> = ({
  data,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<{
    level1: number[]
    level2: number[]
    level3: number[]
  }>({ level1: [], level2: [], level3: [] })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>(
    {}
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelection = (level: string, id: number) => {
    setSelected((prev) => {
      const newSelection = prev[level as keyof typeof prev].includes(id)
        ? prev[level as keyof typeof prev].filter((item) => item !== id)
        : [...prev[level as keyof typeof prev], id]
      const updatedSelection = { ...prev, [level]: newSelection }
      onSelectionChange(updatedSelection)
      return updatedSelection
    })
  }

  const handleSearch = (value: string, level: string, parentId: number) => {
    setSearchQueries((prev) => ({ ...prev, [`${level}_${parentId}`]: value }))
  }

  const filterItems = (
    items: Option[],
    level: string,
    parentId: number
  ): Option[] => {
    const searchQuery = searchQueries[`${level}_${parentId}`] || ''
    return items
      .filter((item) => item.label.includes(searchQuery))
      .map((item) => ({
        ...item,
        children: item.children
          ? filterItems(item.children, level, item.id)
          : undefined,
      }))
  }

  return (
    <div className='p-4' ref={containerRef}>
      <h3>گروه خود را انتخاب کنید</h3>
      <div
        className='border rounded-md h-10 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen(!isOpen)}>
        <span className='text-gray-700'>
          {selected.level1.length > 0
            ? selected.level1
                .map((first) => data.find((row) => row.id === first)?.label)
                .join(',')
            : 'انتخاب کنید'}
        </span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && (
        <div className='border-2 p-1'>
          {data.length === 0 ? (
            <p className='text-center text-gray-500'>موردی یافت نشد</p>
          ) : (
            data.map((parent) => (
              <div
                key={parent.id}
                className='border my-1 px-2 py-1 rounded-md hover:bg-purple-200 cursor-pointer'>
                <div
                  className='flex justify-between items-center'
                  onClick={() => handleSelection('level1', parent.id)}>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      className='accent-[#7747C0] mb-1 w-4 cursor-pointer'
                      checked={selected.level1.includes(parent.id)}
                      readOnly
                    />
                    {/* {selected.level2.length > 0 &&
                      selected.level2.map((second) => {
                        return data
                          .map((col) => {
                            if (col.id === parent.id) {
                              const selectedChild = col.children?.find(
                                (row) => row.id === second
                              )
                              return selectedChild ? selectedChild.label : null
                            }
                            return null
                          })
                          .filter(Boolean).length > 0
                          ? selected.level2
                              .map((secondId) => {
                                const selectedChild = parent.children?.find(
                                  (child) => child.id === secondId
                                )
                                return selectedChild
                                  ? selectedChild.label
                                  : null
                              })
                              .filter(Boolean)
                              .map((label, index) => (
                                <div
                                  className='flex gap-2 bg-yellow-400 px-3 py-1 rounded-full'
                                  key={index}>
                                  {label}
                                  <CloseCircle size={23} color='white' />
                                </div>
                              ))
                          : parent.label
                      })} */}
                    {selected.level2.length > 0 &&
                      selected.level2
                        .map((second) =>
                          data.map(
                            (col) =>
                              col.id === parent.id &&
                              col.children?.find((row) => row.id === second)
                                ?.label
                          )
                        )
                        .map((label, index) =>
                          label ? (
                            <div
                              className='flex gap-2 bg-yellow-400 px-3 py-1 rounded-full'
                              key={index}>
                              {label}
                              <CloseCircle size={23} color='white' />
                            </div>
                          ) : (
                            parent.label
                          )
                        )}
                  </div>
                  <ArrowDown2 size={24} color='#7747C0' />
                </div>
                {selected.level1.includes(parent.id) && parent.children && (
                  <div className='ml-6 mb-2 border shadow-lg p-2'>
                    <div className='sticky top-0  w-full  flex items-center mt-5 mb-10'>
                      <div className='absolute left-10 mt-4 z-20 cursor-pointer text-[#50545F]'>
                        <SearchNormal size={24} color='gray' />
                      </div>
                      <input
                        type='search'
                        placeholder='جستجو'
                        onChange={(e) =>
                          handleSearch(e.target.value, 'level2', parent.id)
                        }
                        className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:shadow-purple-300 focus:shadow-md'
                      />
                    </div>
                    {filterItems(parent.children, 'level2', parent.id)
                      .length === 0 ? (
                      <p className='text-center text-gray-500'>
                        موردی یافت نشد
                      </p>
                    ) : (
                      filterItems(parent.children, 'level2', parent.id).map(
                        (child) => (
                          <div
                            key={child.id}
                            className='border p-2 rounded-md bg-white my-1 hover:bg-purple-300'>
                            <div
                              className='flex justify-between items-center'
                              onClick={() =>
                                handleSelection('level2', child.id)
                              }>
                              <input
                                type='checkbox'
                                className='accent-[#7747C0] w-4 cursor-pointer'
                                checked={selected.level2.includes(child.id)}
                                readOnly
                              />
                              {child.label}
                              <ArrowDown2 size={24} color='#7747C0' />
                            </div>
                            {selected.level2.includes(child.id) &&
                              child.children && (
                                <div className='my-3 mx-4 bg-white border rounded hover:bg-purple-400'>
                                  <div className='sticky top-0  w-full  flex items-center mt-5 mb-10'>
                                    <div className='absolute left-10 mt-4 z-20 cursor-pointer text-[#50545F]'>
                                      <SearchNormal size={24} color='gray' />
                                    </div>
                                    <input
                                      type='search'
                                      placeholder='جستجو'
                                      onChange={(e) =>
                                        handleSearch(
                                          e.target.value,
                                          'level3',
                                          child.id
                                        )
                                      }
                                      className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:shadow-purple-300 focus:shadow-md'
                                    />
                                  </div>
                                  {filterItems(
                                    child.children,
                                    'level3',
                                    child.id
                                  ).length === 0 ? (
                                    <p className='text-center text-gray-500'>
                                      موردی یافت نشد
                                    </p>
                                  ) : (
                                    filterItems(
                                      child.children,
                                      'level3',
                                      child.id
                                    ).map((subChild) => (
                                      <label
                                        key={subChild.id}
                                        className='flex items-center gap-2 px-3 cursor-pointer hover:bg-purple-500 hover:text-white border rounded my-1 shadow-md shadow-purple-300'>
                                        <input
                                          type='checkbox'
                                          className='accent-[#7747C0] w-4 cursor-pointer'
                                          checked={selected.level3.includes(
                                            subChild.id
                                          )}
                                          readOnly
                                          onClick={() =>
                                            handleSelection(
                                              'level3',
                                              subChild.id
                                            )
                                          }
                                        />
                                        {subChild.label}
                                      </label>
                                    ))
                                  )}
                                </div>
                              )}
                          </div>
                        )
                      )
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MultiLevelSelect
