const t = require('tcomb')

const Setting = t.struct({
  name: t.String,
  value: t.maybe(t.String),
  h1Title: t.maybe(t.String),
  metaTitle: t.maybe(t.String),
  meta_description: t.maybe(t.String),
})

module.exports = Setting
