const repository = require('src/infra/repositories/setting')

const getAllSettings = () => {
  return Promise
    .resolve()
    .then(() =>
      repository.getAllValues()
    )
}

const getSetting = (name) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getValueByName(name)
    )
}

module.exports = {
  getAllSettings,
  getSetting
}
