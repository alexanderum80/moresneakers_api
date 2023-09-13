const repository = require('src/infra/repositories/layout')

const setLayout = (page, layout) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updatePage(page, layout)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayout }
