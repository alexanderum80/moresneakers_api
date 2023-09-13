const repository = require('src/infra/repositories/layout')

const getLayoutHottest = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getHottest(page)
    )
}

module.exports = {
  getLayoutHottest
}
