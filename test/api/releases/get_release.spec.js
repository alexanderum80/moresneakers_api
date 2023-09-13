/* eslint-env mocha */

const repository = require('src/infra/repositories/release')

describe('Get all releases', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => repository.create({
      name: 'Adidas Consortium',
      sku: 'abc-asd-123',
      description: 'new release adidas',
      hot: 'true',
      priceEUR: 50,
      priceGBP: 50,
      priceUSD: 50,
      gender: 'Men',
      releaseDate: '2019-03-10',
      color: 'blue',
      customized: false
    })).then(() => {
      done()
    })
  })

  describe('GET /releases', () => {
    it('should list the releases', (done) => {
      request.get(`${BASE_URI}/releases`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(1)
          done(err)
        })
    })
  })
})
