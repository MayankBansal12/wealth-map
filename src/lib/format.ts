export const capitalizeWord = (text: string) => {
  if (!text) return ''
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase()
}

export const formatAliasToNormal = (text: string) => {
  return text
    .split('_')
    .map((t) => capitalizeWord(t))
    .join(' ')
}
