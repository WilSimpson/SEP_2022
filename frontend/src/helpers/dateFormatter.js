const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date) {
  if (date == undefined) {
    return 'Never';
  }

  const d = new Date(date);
  return `${days[d.getDay()]}, ${
    months[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`;
}
