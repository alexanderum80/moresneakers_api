const analitycs = require('src/infra/analitycs')

const getDataUseCase = (eventName) => {
  return analitycs.getData(eventName)
}

module.exports = {
  getDataUseCase
}
