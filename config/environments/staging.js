
module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  timezone: process.env.TIMEZONE,
  uploadImagePath: process.env.UPLOAD_IMAGE_PATH || 'upload/images/',
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  authSecret: process.env.SECRET,
  authSession: {
    session: false
  }
}
