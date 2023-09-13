const t = require('tcomb')

const ReleaseImage = t.struct({
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  imgOrder: t.maybe(t.Number)
})

module.exports = ReleaseImage
