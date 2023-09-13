const repository = require('src/infra/repositories/style')
const { Style } = require('src/domain/style')

const attrs = ['id', 'name', 'description', 'imgUrl', 'parent', 'brand', 'isParent', 'createdAt', 'updatedAt', 'keywords', 'meta_description']

const afterCreate = async (domain, entity) => {

}
const afterUpdate = afterCreate

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Style, attrs, { afterCreate, afterUpdate })


const linkShopsUseCase = require('./link_shops')
const getLinkedShopsUseCase = require('./get_link_shops')
const getPopularUseCase = require('./get_popular')
const getStylesByBrandUseCase = require('./get_by_brand')

const getStyleUseCase = require('./get_style')

const { removeUseCase } = require('./deleteStyle')
const getByExactNameUseCase = require('./get_by_exact_name')

module.exports = {
  getLinkedShopsUseCase,
  linkShopsUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getPopularUseCase,
  getStylesByBrandUseCase,
  getByExactNameUseCase,
  getStyleUseCase
}
