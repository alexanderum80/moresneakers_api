const repository = require('src/infra/repositories/brand')
const { Brand } = require('src/domain/brand')

const attrs = ['id', 'name', 'imgUrl', 'description', 'createdAt', 'updatedAt', 'keywords', 'meta_description']
const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Brand, attrs)
const changeImageUrlUseCase = require('./change_image_url')
const linkShopsUseCase = require('../brand/link_shops')
const getLinkedShopsUseCase = require('../brand/get_link_shops')

module.exports = {
  getLinkedShopsUseCase,
  linkShopsUseCase,
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
