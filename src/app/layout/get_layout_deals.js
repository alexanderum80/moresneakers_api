const repository = require('src/infra/repositories/layout')

const getLayoutDeals= (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.getLayoutDeals(page)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getLayoutDeals }
