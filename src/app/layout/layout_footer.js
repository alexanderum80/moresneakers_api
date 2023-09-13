const repository = require('src/infra/repositories/layout/layout_footer')
const { LayoutFooter } = require('src/domain/layout')
const getLayoutFooterAboutUseCase = require('./get_footer_about_us')

const attrs = ['id', 'brandId', 'collectionId', 'styleId', 'createdAt', 'updatedAt']

const {
  getOneUseCase:getLayoutFooterOneUseCase,
  createUseCase:createLayoutFooterUseCase,
  getAllUseCase:getLayoutFooterAllUseCase,
  removeUseCase:removeLayoutFooterUseCase,
  updateUseCase:updateLayoutFooterUseCase
} = require('src/app/crud')(repository, LayoutFooter, attrs)

module.exports = {
  getLayoutFooterOneUseCase,
  createLayoutFooterUseCase,
  getLayoutFooterAllUseCase,
  removeLayoutFooterUseCase,
  updateLayoutFooterUseCase,
  getLayoutFooterAboutUseCase
}
