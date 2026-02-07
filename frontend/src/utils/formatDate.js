import dayjs from 'dayjs';

export function formatDate(dateStr) {
  return dayjs(dateStr).format('MMM D, YYYY');
}

export function getMonthName(monthNumber) {
  return dayjs().month(monthNumber - 1).format('MMMM');
}
