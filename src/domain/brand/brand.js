const t = require('tcomb')
const { makeEntity } = require('../helper')

const Brand = makeEntity(t.struct({
  name: t.String,
  description: t.String,
  imgUrl: t.maybe(t.String),
  popular: t.maybe(t.list(t.Object)),
  keywords: t.maybe(t.String),
  meta_description: t.maybe(t.String)
}))

module.exports = Brand
