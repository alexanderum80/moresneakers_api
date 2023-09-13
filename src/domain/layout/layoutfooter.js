const t = require('tcomb');
const LayoutFooter = t.struct(
  {
    collectionId: t.maybe(t.String),
    brandId: t.maybe(t.String),
    styleId: t.maybe(t.String),
  },
  {}
);

module.exports = LayoutFooter;
