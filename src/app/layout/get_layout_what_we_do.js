const repository = require('src/infra/repositories/layout')

const getLayoutWhatWeDo = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getWhatWeDo(page)
    )
}

module.exports = {
  getLayoutWhatWeDo
}
