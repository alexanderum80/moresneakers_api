const repository = require('src/infra/repositories/release')

/**
 *
 * Get releases by style id and search parameters
 *
 * @param styleId      The style id
 * @param searchParams Optional search parameters
 *
 * @returns {Promise<unknown>}
 */
const getReleasesByStyle = (styleId, searchParams) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getReleasesByStyle(styleId, searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getReleasesByStyle
};
