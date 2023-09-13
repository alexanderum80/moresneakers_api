const repository = require('src/infra/repositories/style')

const getLinkedShops = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getShops(id)
    ).then((shops) => {
      // shops.map((shop) => shop.id)
      return shops
    })
}

module.exports = {
  getLinkedShops
}
