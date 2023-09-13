const repository = require('src/infra/repositories/layout')

const updateLayoutDeals = (page, id, deal) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateLayoutDeals(page, id, deal)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateLayoutDeals }
