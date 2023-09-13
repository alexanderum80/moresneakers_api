const t = require('tcomb')

const BlogImage = t.struct({
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  position: t.maybe(t.Number)
}, {
  defaultProps: {
    position: 0
  }
})

module.exports = BlogImage
