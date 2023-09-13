const repository = require('src/infra/repositories/layout')

const setLayoutReleasesText2 = (page, wwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateReleasesText2(page, wwd)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayoutReleasesText2 }
