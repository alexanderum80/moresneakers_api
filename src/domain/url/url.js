const t = require('tcomb')

const Url = t.struct({
  url: t.String,
  vanityUrl: t.String
}, {
  defaultProps: {
  }
})

module.exports = Url
