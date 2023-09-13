const t = require('tcomb')
const { makeEntity } = require('../helper')

const Style = makeEntity(t.struct({
  name: t.String,
  description: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  brand: t.maybe(t.String),
  parent: t.maybe(t.String),
  isParent: t.maybe(t.Boolean),
  keywords: t.maybe(t.String),
  meta_description: t.maybe(t.String)
}, {
  defaultProps: {
    isParent: false
  }
}))

module.exports = Style
