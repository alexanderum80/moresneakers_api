const repository = require('src/infra/repositories/layout')

const deleteOurpartnersTab = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.deleteOurPartnersTab(id)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { deleteOurpartnersTab }
