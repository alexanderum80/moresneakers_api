const repository = require('src/infra/repositories/setting')

const setSetting = (name, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateDataByName(name, data)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setSetting }
