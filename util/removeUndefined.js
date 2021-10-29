/**
 * Removes all undefined fields from the input object
 * @param obj Unsanitized object
 * @returns sanitized object
 */
const removeUndefined = (obj) => {
  const sanitizedObj = Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) {
      _acc[key] = obj[key];
    }
    return _acc;
  }, {});

  return sanitizedObj;
};

module.exports = { removeUndefined };
