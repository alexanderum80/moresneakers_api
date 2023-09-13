const repository = require('src/infra/repositories/collection')

const getLinkedShops = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getShops(id)
    ).then((shops) => {
      return shops
    })
}

module.exports = {
  getLinkedShops
}
