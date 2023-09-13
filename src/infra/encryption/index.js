const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

const comparePassword = async (password, encodedPassword) => {
  return bcrypt.compare(password, encodedPassword)
}

module.exports = {
  encryptPassword,
  comparePassword
}
