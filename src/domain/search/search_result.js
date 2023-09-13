const t = require('tcomb')

const SearchResult = t.struct({
  count: t.Number,
  rows: t.list(t.Object)
})

module.exports = SearchResult
