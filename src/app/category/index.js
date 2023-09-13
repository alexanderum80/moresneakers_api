const repository = require('src/infra/repositories/category')
const { Category } = require('src/domain/category')

const attrs = ['id', 'name', 'description', 'imgUrl', 'isGender', 'gender', 'createdAt', 'updatedAt', 'keywords', 'meta_description']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getByNameUseCase
} = require('src/app/crud')(repository, Category, attrs)


module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getByNameUseCase
}
