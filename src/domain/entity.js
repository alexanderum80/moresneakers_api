const t = require('tcomb')

const Entity = t.struct({
  id: t.maybe(t.String),
  createdBy: t.maybe(t.String),
  updatedBy: t.maybe(t.String),
  createdAt: t.maybe(t.Any),
  updatedAt: t.maybe(t.Any)
})

module.exports = Entity
