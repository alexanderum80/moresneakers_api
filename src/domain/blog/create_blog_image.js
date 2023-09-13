const t = require('tcomb')

const CreateBlogImage = t.struct({
  state: t.enums.of(['new', 'old']),
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  position: t.maybe(t.Number)
}, {
  defaultProps: {
    position: 0
  }
})

module.exports = CreateBlogImage
