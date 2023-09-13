const t = require('tcomb')

const SearchParams = t.struct({
  order: t.maybe(t.Any),
  pagination: t.maybe(t.Object),
  filter: t.maybe(t.Object)
})

module.exports = SearchParams
