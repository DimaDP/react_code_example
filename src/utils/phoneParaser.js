/**
 * @desc Formatting phone string
 * @param {string} phone
 * @returns {string}
 */
const phoneParser = (phone) => {
  if (!phone) return '';

  let parsed = '';
  for (let i = 0; i < phone.length; i += 1) {
    if (i === 3) {
      parsed += ` ${phone[i]}`;
    }
    if (i === 7) {
      parsed += ` ${phone[i]}`;
    }
    if (i !== 3 && i !== 7) {
      parsed += phone[i];
    }
  }

  return parsed;
};

export default phoneParser;
