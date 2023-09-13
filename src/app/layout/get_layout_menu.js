const repository = require('src/infra/repositories/layout')

const getMenu = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getMenu(page)
    )
}

module.exports = {
  getMenu
}
