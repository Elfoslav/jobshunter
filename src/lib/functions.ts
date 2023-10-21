export const getDaysPassed = (date: Date): number => {
  const currentDate = new Date()
  const timeDiff = currentDate.getTime() - date.getTime()
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  return daysPassed
}

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export const getTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const getAgoString = (date: Date) => {
  const daysPassed = getDaysPassed(date)
  if (daysPassed === 0) {
    return `Today ${getTime(date)}`
  }

  if (daysPassed === 1) {
    return `${daysPassed} day ago`
  }

  return `${daysPassed} days ago`
}

export const getSingularOrPlural = (singularString: string, num: number) => {
  if (num > 1 || num === 0) {
    return `${singularString}s`
  }

  return singularString
}

/**
 * This function is useful for converting string date from localStorage into Date object
 * Usage: JSON.parse(localStorage.getItem('jobs') || '[]', dateReviver)
 * @param key localstorage key, for example 'jobs'
 * @param value any value from storage object
 * @returns converted Date from string
 */
export const dateReviver = (key: string, value: any) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    return new Date(value)
  }
  return value
}