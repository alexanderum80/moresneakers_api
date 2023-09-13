const t = require('tcomb')

const Slide = t.struct({
  type: t.enums.of(['offer', 'deal']),
  entityId: t.String,
  description: t.maybe(t.String)
}, {
  defaultProps: {
    type: 'offer'
  }
})

const OurPartnersTab = t.struct({
  label: t.maybe(t.String),
  slides: t.list(Slide)
}, {
  defaultProps: {
    slides: []
  }
})

module.exports = OurPartnersTab
