export const getDaysPassed = (date: Date): number => {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysPassed;
}

export const getTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

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