const repository = require('src/infra/repositories/layout')

const getLayoutReleasesText = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getReleasesText(page)
    )
}

module.exports = {
  getLayoutReleasesText
}
