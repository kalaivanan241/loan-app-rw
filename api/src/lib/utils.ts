/**
 * Get difference between two dates in months
 * @param date {Date}}
 * @returns {number} difference in months
 */
export const getDifferenceInMonths = (date: string) => {
  const prevDate= new Date(date);
  const today = new Date()
  const diffInMs = Math.abs(today.getTime() - prevDate.getTime());
  return Math.round(diffInMs / (1000 * 60 * 60 * 24 * 30.5));
}