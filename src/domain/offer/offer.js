const t = require('tcomb');
const { getCurrenciesCodes } = require('../currencies');

const Offer = t.struct(
  {
    releaseId: t.String,
    shopId: t.maybe(t.String),
    offerDate: t.maybe(t.Date),
    currency: t.maybe(t.enums.of(getCurrenciesCodes())),
    price: t.maybe(t.Number),
    discountCode: t.maybe(t.String),
    salePercentage: t.maybe(t.Number),
    status: t.enums.of([
      'sold_out',
      'available',
      'on_sale',
      'unavailable',
      'restock',
      'coming_soon',
      'live',
      'closed',
    ]),
    shipping: t.maybe(
      t.enums.of([
        'worldwide',
        'unavailable',
        'Worldwide',
        'Europe',
        'USA',
        'EMEA',
        'Select Countries',
        'Worldwide Shipping',
        'Shipping to US only',
        'Shipping to EU only',
        'Shipping to EMEA only',
        'Local Shipping',
        'Instore pick-up',
        'Instore First',
        'Instore Only',
      ])
    ),
    countries: t.maybe(t.String),
    links: t.maybe(t.list(t.Object)),
    raffle: t.Boolean,
    raffleStart: t.maybe(t.Date),
    raffleEnd: t.maybe(t.Date),
    releaseTime: t.maybe(t.Date),
    displayWhatsNew: t.maybe(t.Boolean),
    displayOnSale: t.maybe(t.Boolean),
    release: t.maybe(t.Object),
    shop: t.maybe(t.Object),
    timezone: t.maybe(t.enums.of(['CET', 'ET', 'BST', 'EMPTY'])),
    noTime: t.maybe(t.Boolean),
    isPinned:t.maybe(t.Boolean)

  },
  {
    defaultProps: {
      timezone: 'CET',
      displayWhatsNew: false,
      displayOnSale: false,
      links: [],
    },
  }
);

module.exports = Offer;
