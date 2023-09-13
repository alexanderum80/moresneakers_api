const repository = require('src/infra/repositories/layout')

const getLayoutSlider = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getSlider(page)
    )
}

module.exports = {
  getLayoutSlider
}
