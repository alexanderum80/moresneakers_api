/* eslint-env mocha */
const { compose } = require('ramda')
const { models, repository } = require('test/factory')
const userRepository = require('src/infra/repositories/user')

describe('Routes: Login', () => {
  const BASE_URI = `/api/${config.version}`

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('users')

  beforeEach((done) => {
    // we need to add user before we can request our token
    UserUseCase
      .destroy({ where: {} })
      .then(() =>
        UserUseCase.create({
          firstName: 'Test',
          lastName: 'Dev',
          middleName: 'Super Dev',
          email: 'testdev1@gmail.com',
          password: 'pass',
          isDeleted: 0,
          verificationCode: ''
        })
      ).then(() => done())
  })

  describe('POST Token', () => {
    it('should retrieved token', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1@gmail.com',
          password: 'pass'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.include.keys('access_token')
          done(err)
        })
    })

    it('should throw error if email not existing', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1234@gmail.com',
          password: 'pass'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should throw error if password incorrect', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1@gmail.com',
          password: 'pass123'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          expect(res.body.error).to.eql('Invalid credentials')
          done(err)
        })
    })
  })
})
