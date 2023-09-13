const repository = require('src/infra/repositories/style')

const remove = async ({ id }) => {
  try {
    let style = await repository.getStyle(id)
    if (style) {
      if (style.parent === undefined) {
        style.parent = null
      }
      await repository.setParent(id, style.parent)
    }
    return await repository.destroy(id)
  } catch(error) {
    throw new Error(error)
  }
}
const removeUseCase = { remove }

module.exports = {
  removeUseCase
}
