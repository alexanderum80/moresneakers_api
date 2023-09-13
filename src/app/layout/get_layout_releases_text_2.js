const repository = require('src/infra/repositories/layout')

const getLayoutReleasesText2 = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getReleasesText2(page)
    )
}

module.exports = {
  getLayoutReleasesText2
}
