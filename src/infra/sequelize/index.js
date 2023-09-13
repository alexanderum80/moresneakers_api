const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

module.exports = ({ config, basePath }) => {
  const sequelize = new Sequelize(
    config.db.url,
    // we have to remove the depraction warning
    // https://github.com/sequelize/sequelize/issues/8417

    {
      ...config.db,
      operatorsAliases: false,
      pool: { max: 140, min: 0, idle: 10000 },
      benchmark: true,
      logging: false,
    })

  sequelize.authenticate()
    .then(() => {
      console.log('Conectado a')
      console.log(config.db.url)
    })
    .catch(err => {
      console.log('Error al intentar conectar a:')
      console.log(config.db.url)
    })

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const dir = path.join(basePath, './models')

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    db.models[model.name] = model
  })

  Object.keys(db.models).forEach(key => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  })

  return db
}
