/* eslint-env mocha */

const repository = require('src/infra/repositories/release')

describe('Create a release', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => {
      done()
    })
  })

  describe('POST /releases', () => {
    it('should create a release', (done) => {
      request.post(`${BASE_URI}/releases`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Adidas Consortium',
          sku: 'abc-asd-123',
          description: 'new release adidas',
          hot: true,
          priceEUR: 50,
          priceGBP: 50,
          priceUSD: 50,
          gender: 'Men',
          releaseDate: '2019-03-10',
          color: 'blue',
          customized: false
        })
        .expect(200)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should validate release object is not complete', (done) => {
      request.post(`${BASE_URI}/releases`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          sku: 'abc-asd-123',
          description: 'new release adidas',
          hot: 'true',
          priceEUR: '50',
          priceGBP: '50',
          priceUSD: '50',
          gender: 'Men',
          releaseDate: '',
          color: 'blue',
          customized: false,
          styleId: '94f6a741-205c-46d7-a3d9-29a6e51416e4'
        })
        .expect(400)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
