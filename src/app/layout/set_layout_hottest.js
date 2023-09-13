const repository = require('src/infra/repositories/layout')

const setHottest = (page, hottest) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateHottest(page, hottest)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setHottest }
