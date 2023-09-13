const t = require('tcomb')

const LayoutSneakersSection = t.struct({
  link: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  title: t.maybe(t.String),
}, {
  defaultProps: {}
})

module.exports = LayoutSneakersSection
