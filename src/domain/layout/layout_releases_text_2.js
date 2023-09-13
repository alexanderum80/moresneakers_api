const t = require('tcomb')

const LayoutReleasesText2 = t.struct({
  releasesText2: t.maybe(t.String),
}, {
  defaultProps: {}
})

module.exports = LayoutReleasesText2