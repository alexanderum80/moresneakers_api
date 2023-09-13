const repository = require('src/infra/repositories/release')

const setHiddenDashboard = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await repository.setHiddenDashboard(id, true)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setHiddenDashboard }
