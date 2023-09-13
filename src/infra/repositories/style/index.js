const { Style, StyleShops } = require('src/domain/style')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { Op } = require('sequelize')
const Redis = require('src/redis')
// inject database
const { database } = container.cradle
const model = database.models.styles
const releaseModel = database.models.releases
const brandModel = database.models.brands
const styleShopsModel = database.models.style_shops


const StyleRepository = BaseRepository(model, Style)

const setShops = async (id, shops) => {
  const style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  await styleShopsModel.destroy({
    where: {
      shopId: {
        [Op.notIn]: shops.map(shop => shop.shopId)
      },
      styleId: id
    }
  })

  await addShops(id, shops)
  return shops
}

const addShops = async (id, shops) => {
  return Promise.all(shops.map(shop => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = StyleShops(shop)
        styleShopsModel.findOrCreate({
          // defaults: {
          //   linkText: domain.linkText,
          //   linkUrl: domain.linkUrl
          // },
          where: {
            shopId: domain.shopId,
            styleId: id
          }
        }).spread(async function (styleShop, created) {
          styleShop.linkText = domain.linkText
          styleShop.linkUrl = domain.linkUrl
          await styleShop.save()
          resolve(styleShop)
        })
      } catch (error) {
        reject(error)
      }
    })
  }))
}

const getShops = async (id) => {
  const style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  const shops = await style.getShops()
  if (!shops) {
    return []
  }
  return mapStyleShops(shops)
}

const getPopularStyles = async (brandId) => {
  let styles = await model.findAll({
    attributes: ['id', 'name'],
    include: {
      model: releaseModel,
      as: 'releases',
      attributes: ['id']
    },
    where: { brand: brandId }
  })
  styles = styles.map((style) => {
    return {
      id: style.id,
      name: style.name,
      releaseCount: style.releases.length
    }
  })
  styles.sort((a, b) => {
    return b.releaseCount - a.releaseCount
  })
  return styles.slice(0, 5)
}

const getStyle = async (id) => {
  const hash = model.tableName;
  const key = id;
  let dv = await Redis.get(hash, key);
  if(dv){
    return dv;
  }
  const attributes = ['id', 'name', 'description', 'imgUrl', 'parent', 'brand', 'isParent', 'createdAt', 'updatedAt', 'keywords', 'meta_description']

  dv =  await model.findOne({
    attributes,
    where: { id },
    include: [
      { 
        model: brandModel, as: 'BrandModel',

      }
      ]

  })

  const res = await Redis.set(hash, key, dv);
  return res;
    
}

const getByName = async (name) => {
  return model.findAll({
    where: { name },
    include: [{ model: brandModel, as: 'BrandModel' }]
  })
}

const setParent = async (oldParentId, newParentId) => {
  return model.update({ parent: newParentId }, { where: { parent: oldParentId } })
}

const mapStyleShops = (shops) => {
  return shops.map(shop => StyleShops(shop))
}

const getStylesByBrand = async (brandId) => {
  return model.findAll({
    attributes: ['id', 'name','isParent','parent'],
    include: [
      {
        model: releaseModel,
        as: 'releases',
        attributes: ['id','name','mainImage']
      },
      { 
        model: brandModel, as: 'BrandModel',
        attributes: ['imgUrl','name']

      }
    ],
    where: { brand: brandId }
  });
}

Object.assign(StyleRepository, {
  getShops,
  setShops,
  getPopularStyles,
  setParent,
  getStyle,
  getByName,
  getStylesByBrand
})

module.exports = StyleRepository
