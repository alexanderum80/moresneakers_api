const repository = require('src/infra/repositories/deal')

const getDealsList = (seaarhParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deals = await repository.getDealsList(seaarhParams)
      resolve(deals)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getDealsList }
