const repository = require('src/infra/repositories/layout')

const getPageLayout = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getByPage(page)
    )
}

module.exports = {
  getPageLayout
}
