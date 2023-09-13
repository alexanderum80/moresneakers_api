const { toEntity } = require('./transform')
const { comparePassword } = require('../../encryption')

module.exports = (model) => {
  const getAll = (...args) =>
    model.findAll(...args).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (...args) =>
    model.findById(...args)
      .then((data) => {
        if (!data) {
          return null
        }
        const { dataValues } = data
        return toEntity(dataValues)
      })
      .catch((error) => { throw new Error(error) })

  const findOne = (...args) =>
    model.findOne(...args)
      .then((data) => {
        if (!data) {
          return null
        }
        const { dataValues } = data
        return toEntity(dataValues)
      })
      .catch((error) => { throw new Error(error) })

  const validatePassword = async (endcodedPassword) => (password) =>
    comparePassword(password, endcodedPassword)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    findById,
    findOne,
    validatePassword,
    destroy
  }
}
