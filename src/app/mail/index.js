const mailService = require('src/infra/mail')
const sender = 'contact@moresneakers.com'
const receiver = 'contact@moresneakers.com'

const sendEmailUseCase = (content) => {
  let contentText = 'Name: ' + content.name + '\nEmail: ' + content.email + '\nSubject: ' + content.subject + '\nDescription: ' + content.description
  return mailService.sendMail(sender, receiver, contentText)
}

module.exports = {
  sendEmailUseCase
}
