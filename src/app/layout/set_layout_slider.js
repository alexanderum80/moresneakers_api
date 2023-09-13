const repository = require('src/infra/repositories/layout')

const setLayout = (page, slider) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await repository.updateSlider(page, slider)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { setLayout }
