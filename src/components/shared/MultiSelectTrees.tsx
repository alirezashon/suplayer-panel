import { ArrowLeft2, ArrowRight2, Profile } from 'iconsax-react'
import { useState } from 'react'
interface TreeItem {
  id: number | string
  label: string
  children: { id: number | string; label: string }[]
}
interface RadioTreeSelectorProps {
  trees: TreeItem[]
  placeholder: string
  onSelect: (selected: string[]) => void
}
const MultiSelectTrees: React.FC<RadioTreeSelectorProps> = ({
  trees,
  placeholder,
  onSelect,
}) => {
  const [selectedManager, setSelectedManager] = useState<
    null | number | string
  >(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItems, setSelectedItemsState] = useState<(string | number)[]>(
    []
  )
  const handleCheckboxChange = (id: string | number, label: string) => {
    const updated = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id]
    setSelectedItemsState(updated)
    onSelect(updated.map(String)) // آرایه‌ای از `string` را ارسال می‌کنیم
  }
  return (
    <div className='w-full'>
      <div
        className='border border-gray-300 rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-gray-700'>
          {selectedItems.length > 0
            ? selectedItems
                .map((id) => {
                  const parent = trees.find((tree) =>
                    tree.children.some((child) => child.id === id)
                  )
                  return parent?.children.find((child) => child.id === id)
                    ?.label
                })
                .filter(Boolean) // حذف `undefined`ها
                .join(', ')
            : placeholder}
        </span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      {isOpen && (
        <div className='border rounded-lg'>
          {!selectedManager ? (
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
            <div className='flex flex-col'>
              <div
                className='flex items-center px-4 py-2 cursor-pointer text-[#7747C0]'
                onClick={() => setSelectedManager(null)}>
                <ArrowRight2 size={20} color='#7747C0' />
                <span>بازگشت</span>
              </div>
              {trees
                .find((tree) => tree.id === selectedManager)
                ?.children.map((child) => (
                  <label
                    key={child.id}
                    className='flex items-center gap-2 px-4 py-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(child.id)}
                      onChange={() =>
                        handleCheckboxChange(child.id, child.label)
                      }
                      className='form-checkbox h-5 w-5 border-2 rounded cursor-pointer accent-[#7747C0]'
                    />
                    <span
                      className={
                        selectedItems?.includes(child.label)
                          ? 'text-[#7747C0]'
                          : 'text-gray-700'
                      }>
                      {child.label}
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default MultiSelectTrees