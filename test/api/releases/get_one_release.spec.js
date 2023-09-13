/* eslint-env mocha */

const repository = require('src/infra/repositories/release')

describe('Get one release by id', () => {
  const BASE_URI = `/api/${config.version}`

  let id

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
    })).then((entity) => {
      id = entity.id
      done()
    })
  })

  describe('GET /releases/{id}', () => {
    it('should list the releases', (done) => {
      request.get(`${BASE_URI}/releases/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Object')
          done(err)
        })
    })
  })
})
