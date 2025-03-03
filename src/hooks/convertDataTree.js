export const generateMultiSelectData = ({
  level1,
  level2,
  level3,
}) => {
  if (!level1.idKey) return []
  const mapData = (level) =>
    Array.isArray(level?.data) && level?.data?.reduce((acc, curr) => {
      acc[curr[level.idKey]] = {
        id: curr[level.idKey],
        label: curr[level.labelKey],
        children: [],
      }
      return acc
    }, {}) || {}

  const level3Map = mapData(level3)
  const level2Map = mapData(level2)
  const level1Map = mapData(level1)

  Object.values(level3Map).forEach((item) => {
    const parentId = level3?.data.find((d) => d.id === item.id)?.[
      level3.parentKey
    ]
    if (parentId && level2Map[parentId])
      level2Map[parentId].children?.push(item)
  })

  Object.values(level2Map).forEach((item) => {
    const parentId = level2?.data.find((d) => d.id === item.id)?.[
      level2.parentKey
    ]
    if (parentId && level1Map[parentId])
      level1Map[parentId].children?.push(item)
  })

  const result = Object.values(level1Map)
  return result
}
