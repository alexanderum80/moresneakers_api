const { Brand, BrandShops } = require('src/domain/brand')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { Op } = require('sequelize')
// inject database
const { database } = container.cradle
const model = database.models.brands
const styleModel = database.models.styles
const releaseModel = database.models.releases
const brandShopsModel = database.models.brand_shops
// const Sequelize = require('sequelize')

const getOptionsCallback = (searchParams) => {
  if (searchParams.filter && searchParams.filter.popular) {
    const include = {
      model: styleModel,
      as: 'popular',
      attributes: [ 'id', 'name' ],
      include: {
        model: releaseModel,
        as: 'releases',
        attributes: [ 'id' ]
      }
    }
    delete searchParams.filter.popular
    return {
      include: [ include ],
      distinct: true
    }
  }
  return {}
}

const filterMappings = {
  init: value => {
    return {
      filter: { name: { [Op.like]: `${value}%` } }
    };
  }
}

const repository = BaseRepository(model, Brand, { getOptionsCallback, filterMappings })

const setShops = async (id, shops) => {
  const entity = await model.findOne({
    where: { id }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  await brandShopsModel.destroy({
    where: {
      shopId: {
        [Op.notIn]: shops.map(shop => shop.shopId)
      },
      brandId: id
    }
  })
  addShops(id, shops);
  return shops
}

const addShops = async (id, shops) => {
  return Promise.all(shops.map(shop => {
    return new Promise(async (resolve, reject) => {
        try {
            const domain = BrandShops(shop)
            brandShopsModel.findOrCreate({
              where: {
                shopId: domain.shopId,
                brandId: id
              }
            }).spread(async function(brandShop, created){
              brandShop.displayOnBrands = domain.displayOnBrands;
              await brandShop.save();
              resolve(brandShop)
            });
        } catch (error) {
            reject(error)
        }
    })
  }))
}

const getShops = async (id) => {
  const entity = await model.findOne({
    where: { id }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  const shops = await entity.getShops()
  if (!shops) {
    return []
  }
  return mapBrandShops(shops)
}

const mapBrandShops = (shops) => {
  return shops.map(shop => {
	if (shop.displayOnBrands === null) {
		shop.displayOnBrands = false
	}
	return BrandShops(shop)
  })
}

Object.assign(repository, {
  getShops,
  setShops
})

module.exports = repository
