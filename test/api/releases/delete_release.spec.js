/* eslint-env mocha */

const repository = require('src/infra/repositories/release')

describe('Delete a release', () => {
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

  describe('DELETE /releases/{id}', () => {
    it('should return unauthorized if no token', (done) => {
      request.delete(`${BASE_URI}/releases/${id}`)
        .expect(401)
        .end((err, res) => {
          done(err)
        })
    })

    it('should delete a release', (done) => {
      request.delete(`${BASE_URI}/releases/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.eql(true)
          done(err)
        })
    })
  })
})
