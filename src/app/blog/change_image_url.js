const repository = require('src/infra/repositories/blog')

const updateImageUrl = (id, imgUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      await repository.update({ imgUrl: imgUrl }, id)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateImageUrl }
