const repository = require('src/infra/repositories/layout')

const setMenu = (page, menu) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateMenu(page, menu)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setMenu }
