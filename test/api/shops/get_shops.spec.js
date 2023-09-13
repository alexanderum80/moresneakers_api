/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Get all shops', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => repository.bulkCreate([{
      name: 'Foot Locker',
      active: true,
      address: 'asd',
      shippingDetails: 'world wide',
      currency: 'EUR',
      rank: 5,
      region: 'Europe',
      country: 'France',
      showOnRegion: 'Europe'
    }, {
      name: 'Moresneakers',
      active: true,
      address: 'EU',
      shippingDetails: 'world wide',
      currency: 'EUR',
      rank: 4,
      region: 'Europe',
      country: 'France',
      showOnRegion: 'Marketplaces'
    }, {
      name: 'Nike USA',
      active: true,
      address: 'EU',
      shippingDetails: 'world wide',
      currency: 'EUR',
      rank: 4,
      region: 'Europe',
      country: 'France',
      showOnRegion: 'USA'
    }])).then(() => {
      done()
    })
  })

  describe('GET /shops', () => {
    it('should list the shops', (done) => {
      request.get(`${BASE_URI}/shops`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(3)
          res.body.data.forEach((shop) => {
            expect(shop).to.include.keys('name')
            expect(shop).to.include.keys('showOnRegion')
            expect(shop).to.include.keys('rank')
            expect(shop).to.include.keys('region')
            expect(shop).to.include.keys('country')
          })
          done(err)
        })
    })

    it('should filter shops in Marketplaces', (done) => {
      request.get(`${BASE_URI}/shops?showOnRegion=Marketplaces`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(1)
          res.body.data.forEach((shop) => {
            expect(shop).to.include.keys('name')
            expect(shop).to.include.keys('showOnRegion')
            expect(shop).to.include.keys('rank')
            expect(shop).to.include.keys('region')
            expect(shop).to.include.keys('country')
          })
          done(err)
        })
    })
  })
})
