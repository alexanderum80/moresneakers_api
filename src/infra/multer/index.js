const multer = require('multer')
const uniqid = require('uniqid')
const path = require('path')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

module.exports = ({ config }) => {
  let storage
  if (config.env !== 'development1') {
    // production, staging configuration
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    })
    const s3 = new aws.S3()
    storage = multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME || 'moresneakers-images',
      acl: 'bucket-owner-full-control',
      metadata: function (req, file, cb) {
        cb(null, {
          fieldName: file.fieldname
        })
      },
      key: function (req, file, cb) {
        //cb(null, (req.params.newfilename ? req.params.newfilename : Date.now().toString()) + path.extname(file.originalname) )
        const ext = path.extname(file.originalname)
        let iamgeName = `${Date.now().toString()}${ext}`

        if (Boolean(req.body.nameFile) && req.body.nameFile != 'undefined')
          iamgeName = `${req.body.nameFile}${ext}`
        else if (req.params.newfilename) iamgeName = req.params.newfilename + ext

        cb(null, iamgeName)
      },
      contentType: multerS3.AUTO_CONTENT_TYPE
    })
  } else {
    // development configuration
    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/' + (config.uploadImagePath || 'upload/images'))
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null,
          req.body.nameFile
            ? `${req.body.nameFile}${ext}`
            : uniqid('img') + ext)
      }
    })
  }

  const upload = multer({ storage: storage })
  return {
    image: upload.single('image'),
    file: upload.single('file')
  }
}
