const repository = require('src/infra/repositories/layout')

const setHeader = (page, header) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      const result = await repository.updateHeader(page, header)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setHeader }
