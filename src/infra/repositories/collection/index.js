const { Collection, CollectionShops } = require('src/domain/collection')
const { Op } = require('sequelize')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { database } = container.cradle
const model = database.models.collections
const collectionShopsModel = database.models.collection_shops
const brandModel = database.models.brands

const setShops = async (id, shops) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }

  await collectionShopsModel.destroy({
    where: {
      shopId: {
        [Op.notIn]: shops.map(shop => shop.shopId)
      },
      collectionId: id
    }
  })

  await addShops(id, shops);
  return shops
}

const addShops = async (id, shops) => {
  return Promise.all(shops.map(shop => {
    return new Promise(async (resolve, reject) => {
        try {
            const domain = CollectionShops(shop)
            collectionShopsModel.findOrCreate({
              where: {
                shopId: domain.shopId,
                collectionId: id
              }
            }).spread(async function(collectionShop, created){
              collectionShop.linkText = domain.linkText;
              collectionShop.linkUrl = domain.linkUrl;
              await collectionShop.save();
              resolve(collectionShop)
            });
        } catch (error) {
            reject(error)
        }
    })
  }))
}

const getShops = async (id) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  const shops = await collection.getShops()
  if (!shops) {
    return []
  }
  return mapCollectionShops(shops)
}

const setReleases = async (id, releases) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  await collection.setReleases(releases)
  return releases
}

const getReleases = async (id) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  const releases = await collection.getReleases()
  if (!releases) {
    return []
  }
  return releases
}

const getByName = async (name) => {
  return model.findAll({
    where: { name },
    include: [{ model: brandModel, as: 'brandId' }]
  })
}

const mapCollectionShops = (shops) => {
  return shops.map(shop => CollectionShops(shop))
}

const CollectionRepository = BaseRepository(model, Collection)
Object.assign(CollectionRepository, {
  getShops,
  setShops,
  getReleases,
  setReleases,
  getByName
})
module.exports = CollectionRepository
