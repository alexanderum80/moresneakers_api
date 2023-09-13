const repository = require('src/infra/repositories/layout')

const setLayouWhatWeDo = (page, wwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateWhatWeDo(page, wwd)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayouWhatWeDo }
