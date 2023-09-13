const repository = require('src/infra/repositories/layout')

const setLayoutReleasesText = (page, wwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateReleasesText(page, wwd)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayoutReleasesText }
