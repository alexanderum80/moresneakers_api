const container = require('src/container')
const signIn = container.resolve('jwt').signin()
const { compose } = require('ramda')
const { models, repository } = require('test/factory')
const userRepository = require('src/infra/repositories/user')
const UserUseCase = compose(
  repository(userRepository),
  models
)('users')

const getToken = async () => {
  // we need to add user before we can request our token
  return UserUseCase
    .destroy({ where: {} })
    .then(() =>
      UserUseCase.create({
        firstName: 'Test',
        lastName: 'Dev',
        middleName: 'Super Dev',
        email: 'testdev@gmail.com',
        password: 'pass',
        roleId: 1,
        isDeleted: 0,
        createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        verificationCode: ''
      })
    ).then((user) => {
      return signIn({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email
      })
    })
}

module.exports = getToken
