const repository = require('src/infra/repositories/setting')

const setSetting = (name, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateValueByName(name, value)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setSetting }
