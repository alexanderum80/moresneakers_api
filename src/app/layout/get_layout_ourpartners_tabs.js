const repository = require('src/infra/repositories/layout')

const getOurpartnersTabs = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.getOurPartnersTabs(page)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getOurpartnersTabs }
