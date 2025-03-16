import { OptionTrees } from '@/interfaces'
import { ArrowDown2, CloseCircle, SearchNormal } from 'iconsax-react'
import  { useEffect, useRef, useState } from 'react'

interface MultiLevelSelectProps {
  data: OptionTrees[]
  title: string
  onSelectionChange: (selected: {
    level1: string[]
    level2: string[]
    level3: string[]
  }) => void
}

const MultiLevelSelect: React.FC<MultiLevelSelectProps> = ({
  data,
  onSelectionChange,
  title,
}) => {
  const [selected, setSelected] = useState<{
    level1: string[]
    level2: string[]
    level3: string[]
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
  const handleSelection = (level: string, id: string) => {
    if (level === 'level1' && selected?.level1.includes(id)) {
      const selectedChildren = data
        .find((item) => item.id === id)
        ?.children?.filter((child) => selected.level2.includes(child.id))
      selectedChildren?.map((selected) =>
        handleSelection('level2', selected.id)
      )
    }
    setSelected((prev) => {
      const newSelection = prev[level as keyof typeof prev].includes(id)
        ? prev[level as keyof typeof prev].filter((item) => item !== id)
        : [...prev[level as keyof typeof prev], id]

      let updatedSelection = { ...prev, [level]: newSelection }

      // اگر انتخاب در سطح 2 انجام شده، فرزندان را مدیریت کن
      if (level === 'level2') {
        const parent = data?.find((item) =>
          item.children?.some((child) => child.id === id)
        )

        const selectedChildren =
          parent?.children?.find((child) => child.id === id)?.children || []

        const newLevel3Selection = prev.level2.includes(id)
          ? prev.level3.filter(
              (item) => !selectedChildren.some((child) => child.id === item)
            )
          : [...prev.level3, ...selectedChildren.map((child) => child.id)]

        updatedSelection = { ...updatedSelection, level3: newLevel3Selection }
      }

      onSelectionChange(updatedSelection)
      return updatedSelection
    })
  }

  const handleSearch = (value: string, level: string, parentId: string) => {
    setSearchQueries((prev) => ({ ...prev, [`${level}_${parentId}`]: value }))
  }

  const filterItems = (
    items: OptionTrees[],
    level: string,
    parentId: string
  ): OptionTrees[] => {
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
  const findSelectedLevel2Labels = (parent: OptionTrees) => {
    // اگر والد هیچ فرزندی نداشته باشد، همان نام خود والد را برگردان
    if (!parent.children || parent.children.length === 0) {
      return parent.label
    }
    // فیلتر کردن فرزندانی که در سطح دوم انتخاب شده‌اند
    const selectedChildren = parent.children.filter((child) =>
      selected.level2.includes(child.id)
    )
    // اگر فرزندی انتخاب شده بود، نام فرزندان را برگردان
    if (selectedChildren.length > 0) {
      return selectedChildren.map((child, index) => (
        <div
          className='flex flex-wrap gap-2 bg-yellow-400 px-3 py-1 rounded-full'
          key={index}>
          {child.label}
          <CloseCircle
            size={23}
            color='white'
            onClick={(e) => {
              e.stopPropagation()
              handleSelection('level2', child?.id)
            }}
          />
        </div>
      ))
    }
    // اگر هیچ فرزندی انتخاب نشده بود، نام خود parent را برگردان
    return parent.label
  }

  return (
    <div className='p-4' ref={containerRef}>
      <h3>{title}</h3>
      <div
        className='border rounded-md min-h-12 px-4 py-2 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen(!isOpen)}>
        <div className='flex flex-wrap gap-2 text-gray-700'>
          {selected.level1.length > 0
            ? selected.level1
                .map((first) => data?.find((row) => row.id === first))
                .map((child, index) => (
                  <div
                    className='flex gap-2 w-fit text-nowrap bg-purple-400 px-3 py-1 rounded-full'
                    key={index}>
                    {child?.label}
                    <CloseCircle
                      size={23}
                      color='white'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelection('level1', child?.id as string)
                      }}
                    />
                  </div>
                ))
            : 'انتخاب کنید'}
        </div>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && (
        <div className='border-2 p-1'>
          {data?.length === 0 ? (
            <p className='text-center text-gray-500'>موردی یافت نشد</p>
          ) : (
            data?.map((parent) => (
              <div
                key={parent.id}
                className='border my-1 px-2 py-1 rounded-md hover:bg-purple-50 cursor-pointer'>
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
                    {findSelectedLevel2Labels(parent)}
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
                        className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none  '
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
                            className='border p-2 rounded-md bg-white my-1 hover:bg-purple-100'>
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
                                <div className='my-3 mx-4 bg-white border rounded'>
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
                                      className='absolute mt-4 right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none '
                                    />
                                  </div>
                                  <div className='max-h-[50vh] overflow-y-auto'>
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
                                          className='flex items-center gap-2 px-3 cursor-pointer border rounded my-1 hover:bg-purple-200'>
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
