const repository = require('src/infra/repositories/style')

const getStyle = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getStyle(id)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getStyle
}
