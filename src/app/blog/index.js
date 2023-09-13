const repository = require('src/infra/repositories/blog')
const { Blog } = require('src/domain/blog')

const attrs = ['id', 'title', 'body', 'type', 'brandId', 'imgUrl', 'author', 'createdAt', 'updatedAt', 'slug', 'keywords', 'meta_description']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase,
  getBySlugUseCase
} = require('src/app/crud')(repository, Blog, attrs)
const changeImageUrlUseCase = require('./change_image_url')
const createImageUseCase = require('./create_image')
const removeImageUseCase = require('./delete_image')
const getAllImagesUseCase = require('./getAllImages')
const createUseCase = require('./create');
const updateUseCase = require('./update');

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  createImageUseCase,
  removeImageUseCase,
  getAllImagesUseCase,
  getBySlugUseCase
}
