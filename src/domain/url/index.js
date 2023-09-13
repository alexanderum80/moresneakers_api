const { makeEntity } = require('../helper')

const transform = (data) => {
  return data
}

const Url = makeEntity(require('./url'), transform)

module.exports = { Url }
