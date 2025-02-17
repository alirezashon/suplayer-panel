import React, { useState } from 'react'

interface TreeItem {
  id: number | string
  label: string
  children: string[]
}

interface RadioTreeSelectorProps {
  trees: TreeItem[]
  placeholder: string
  onSelect: (selected: string) => void
}

const RadioSelectree: React.FC<RadioTreeSelectorProps> = ({
  trees,
  placeholder,
  onSelect,
}) => {
  const [selectedManager, setSelectedManager] = useState<
    number | string | null
  >(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  return (
    <div className='w-full'>
      <div
        className='border border-gray-300 rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-gray-700'>{selectedName || placeholder}</span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && !selectedManager ? (
        <div className='flex flex-col'>
          {trees.map((tree) => (
            <div
              key={tree.id}
              className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => setSelectedManager(tree.id)}>
              <span>{tree.label}</span>
              <span className='ml-auto'>&#x1F464;</span> {/* Icon */}
            </div>
          ))}
        </div>
      ) : (
        isOpen && (
          <div className='flex flex-col'>
            <div
              className='flex items-center gap-2 px-4 py-2 cursor-pointer text-[#7747C0]'
              onClick={() => setSelectedManager(null)}>
              <span>بازگشت</span>
              <span className='ml-auto'>&#x25C0;</span> {/* Back Arrow Icon */}
            </div>
            {trees
              .find((tree) => tree.id === selectedManager)
              ?.children.map((child, index) => (
                <label
                  key={index}
                  className='flex items-center gap-2 px-4 py-2 cursor-pointer'>
                  <input
                    type='radio'
                    name='teamMember'
                    checked={selectedName === child}
                    onChange={() => {
                      setSelectedName(child)
                      onSelect(child)
                    }}
                    className='form-radio appearance-none h-5 w-5 border-2 rounded-full bg-white checked:bg-[#7747C0] cursor-pointer'
                  />
                  <span
                    className={`${
                      selectedName === child
                        ? 'text-[#7747C0]'
                        : 'text-gray-700'
                    }`}>
                    {child}
                  </span>
                </label>
              ))}
          </div>
        )
      )}
    </div>
  )
}

export default RadioSelectree
