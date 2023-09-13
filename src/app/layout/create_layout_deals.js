const repository = require('src/infra/repositories/layout')

const createLayoutDeals = (page, deal) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.createLayoutDeals(page, deal)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { createLayoutDeals }
