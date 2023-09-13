const repository = require('src/infra/repositories/deal')

const getAllByShop = (shopId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deals = await repository.getAllByShop(shopId)
      resolve(deals)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getAllByShop }
