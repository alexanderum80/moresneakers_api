const t = require('tcomb')

const LayoutReleasesText = t.struct({
  releasesText: t.maybe(t.String),
}, {
  defaultProps: {}
})

module.exports = LayoutReleasesText
