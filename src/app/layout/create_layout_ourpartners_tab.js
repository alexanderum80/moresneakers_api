const repository = require('src/infra/repositories/layout')

const createOurpartnersTab = (page, tab) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.createOurPartnersTab(page, tab)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { createOurpartnersTab }
