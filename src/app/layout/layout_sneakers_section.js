const repository = require('src/infra/repositories/layout/sneakers_section')
const { LayoutSneakersSection } = require('src/domain/layout')

const attrs = ['id', 'title', 'imgUrl', 'link', 'createdAt', 'updatedAt']

const {
  getOneUseCase: getLayoutSneakersSectionOneUseCase,
  createUseCase: createLayoutSneakersSectionUseCase,
  getAllUseCase: getLayoutSneakersSectionUseCase,
  removeUseCase: deleteLayoutSneakersSectionUseCase,
  updateUseCase: updateLayoutSneakersSectionUseCase
} = require('src/app/crud')(repository, LayoutSneakersSection, attrs)

module.exports = {
  getLayoutSneakersSectionOneUseCase,
  createLayoutSneakersSectionUseCase,
  getLayoutSneakersSectionUseCase,
  deleteLayoutSneakersSectionUseCase,
  updateLayoutSneakersSectionUseCase
}
