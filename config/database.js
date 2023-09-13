const path = require('path')
const dotEnvPath = path.resolve('.env')

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath })

module.exports = {
  development: {
    'url': process.env.DATABASE_URL,
    'dialect': 'mysql',
    'define': {
      'underscored': true
    }
  },
  test: {
    'url': process.env.DATABASE_URL_TEST,
    'dialect': 'mysql',
    'define': {
      'underscored': true
    }
  },
  staging: {
    'url': process.env.DATABASE_URL_STAGING,
    'dialect': 'mysql',
    'define': {
      'underscored': false
    }
  },
  production: {
    'url': process.env.RDS_CONNECTION_URL || 'mysql://dotzerodev:E7LCYGp6@moresneakers.ckt3wwdf3bjk.eu-west-3.rds.amazonaws.com/more_sneakers',
    'dialect': 'mysql',
    'define': {
      'underscored': false
    }
  }
}
