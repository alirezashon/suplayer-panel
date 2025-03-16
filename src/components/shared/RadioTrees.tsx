import { ArrowLeft2, ArrowRight2, Profile } from 'iconsax-react'
import  { useState } from 'react'

interface TreeItem {
  id: number | string
  label: string
  children: { id: number | string; label: string }[]
}

interface RadioTreeSelectorProps {
  trees: TreeItem[]
  placeholder: string
  onSelect: (selected: string) => void
}

const RadioTreeSelector: React.FC<RadioTreeSelectorProps> = ({
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
      <div className='border rounded-lg'>
        {isOpen && !selectedManager ? (
          <div className='flex flex-col'>
            {trees.map((tree) => (
              <div
                key={tree.id}
                className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                onClick={() => setSelectedManager(tree.id)}>
                <div className='flex'>
                  <Profile size={20} color='#0f0f0f' />
                  <span>{tree.label}</span>
                </div>
                <ArrowLeft2 size={20} color='#0f0f0f' />
              </div>
            ))}
          </div>
        ) : (
          isOpen && (
            <div className='flex flex-col'>
              <div
                className='flex items-center px-4 py-2 cursor-pointer text-[#7747C0]'
                onClick={() => setSelectedManager(null)}>
                <ArrowRight2 size={20} color='#7747C0' />
                <span>بازگشت</span>
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
                      checked={selectedName === `${child.label}`}
                      onChange={() => {
                        setSelectedName(`${child.label}`)
                        onSelect(`${child.id}`)
                      }}
                      className='form-radio appearance-none h-5 w-5 border-2 rounded-full bg-white checked:bg-[#7747C0] cursor-pointer'
                    />
                    <span
                      className={`${
                        selectedName === `${child.label}`
                          ? 'text-[#7747C0]'
                          : 'text-gray-700'
                      }`}>
                      {child.label}
                    </span>
                  </label>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default RadioTreeSelector
