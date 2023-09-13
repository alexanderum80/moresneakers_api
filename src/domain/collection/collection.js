const t = require('tcomb')
const { makeEntity } = require('../helper')

const Collection = makeEntity(t.struct({
  name: t.String,
  brand: t.maybe(t.String),
  description: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  keywords: t.maybe(t.String),
  meta_description: t.maybe(t.String)
}))

module.exports = Collection
