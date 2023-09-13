/* eslint-env mocha */

const repository = require('src/infra/repositories/release')

describe('Update a release', () => {
  const BASE_URI = `/api/${config.version}`

  let id

  beforeEach((done) => {
    repository.destroyAll().then(() => repository.create({
      name: 'Adidas Consortium',
      sku: 'abc-asd-123',
      description: 'old description',
      hot: true,
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

  describe('PUT /releases', () => {
    it('should update a release', (done) => {
      request.put(`${BASE_URI}/releases/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Adidas Consortium',
          sku: 'abc-asd-123-new',
          description: 'new description',
          hot: false,
          priceEUR: 60,
          priceGBP: 70,
          priceUSD: 80,
          gender: 'Women',
          releaseDate: '2019-04-10',
          color: 'red',
          customized: true
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.be.an('Object')
          expect(res.body).to.include.keys('data')
          expect(res.body.data.name).to.be.equal('Adidas Consortium')
          expect(res.body.data.description).to.be.equal('new description')
          expect(res.body.data.sku).to.be.equal('abc-asd-123-new')
          done(err)
        })
    })
  })
})
