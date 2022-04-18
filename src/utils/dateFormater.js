/**
 * @desc formatting date object to date string
 * @param {Object} date
 * @returns {string|null}
 */
const dateFormatter = (date) => {
  if (date === null) return null;

  const today = new Date(date);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
};

export default dateFormatter;
