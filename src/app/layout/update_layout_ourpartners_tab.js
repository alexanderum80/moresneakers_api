const repository = require('src/infra/repositories/layout')

const updateOurpartnersTab = (page, id, tab) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateOurPartnersTab(page, id, tab)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateOurpartnersTab }
