/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')
const InvalidCredentialsError = require('src/infra/errors/InvalidCredentialsError')

/**
  * function for getter user.
  */
module.exports = ({ userRepository, webToken }) => {
  // code for getting all the items
  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = Token(body)
        const userCredentials = await userRepository.findOne({
          attributes: [
            'id', 'firstName', 'lastName', 'middleName', 'email', 'password', 'roleId', 'isDeleted', 'createdBy'
          ],
          where: {
            email: credentials.email,
            isDeleted: 0
          }
        })
        if (!userCredentials) {
          throw new InvalidCredentialsError()
        }
        const validatePass = await userRepository.validatePassword(userCredentials.password)

        if (!validatePass(credentials.password)) {
          throw new InvalidCredentialsError()
        }
        const signIn = webToken.signin()

        resolve({
          access_token: signIn({
            id: userCredentials.id,
            email: userCredentials.email,
            roleId: userCredentials.roleId
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    validate
  }
}
