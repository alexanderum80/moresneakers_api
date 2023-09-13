const t = require('tcomb')

const LayoutWhatWeDo = t.struct({
  whatWeDo: t.maybe(t.String),
}, {
  defaultProps: {}
})

module.exports = LayoutWhatWeDo
