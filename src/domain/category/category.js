const t = require('tcomb')
const {makeEntity} = require('../helper')

const Category = makeEntity(t.struct({
    name: t.String,
    description: t.maybe(t.String),
    imgUrl: t.maybe(t.String),
    isGender: t.maybe(t.Boolean),
    // gender: t.enums.of(['m', 'f', 'u', 'c']),
    gender:t.maybe(t.String),
    keywords: t.maybe(t.String),
    meta_description: t.maybe(t.String)
  },
  {
    defaultProps: {
      isGender: false
    }
  }
))

module.exports = Category
