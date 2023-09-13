const repository = require('src/infra/repositories/layout')

const setLayoutHeading = (page, heading) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateHeading(page, heading)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayoutHeading }
