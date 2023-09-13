const AWS = require('aws-sdk')

const sendMail = async (from, to, contentText) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  })

  const ses = new AWS.SES({ apiVersion: '2010-12-01' })
  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: contentText
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Moresneakers Contact Form'
      }
    },
    Source: from
  }

  return ses.sendEmail(params).promise()
}

module.exports = {
  sendMail
}
