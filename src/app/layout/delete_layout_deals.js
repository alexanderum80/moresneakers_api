const repository = require('src/infra/repositories/layout')

const deleteLayoutDeals = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.deleteLayoutDeals(id)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { deleteLayoutDeals }
