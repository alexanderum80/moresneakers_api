const getBoolean = (value) => {
  if(value === undefined || value === null)
    return false
  if (typeof value === 'string' || value instanceof String) {
    return value === 'true' || value === '1';
  }
  return Boolean(value)
}

module.exports = { getBoolean }
