const fs = require('fs');
const AWS = require('aws-sdk'),
    mime = require('mime')

const Jimp = require('jimp');

module.exports = (url, urlThumbnail = "", size = 265) => {

    const makeThumbnail = () => {

        const options = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION
        }

        var s3 = new AWS.S3(options);

        return new Promise(async (resolve, reject) => {

            try {

                if (!url) {
                    resolve(false)
                    return false
                }

                if (existThumbnail()) {
                    resolve(false)
                    return false
                }

                const image = await Jimp.read(url)
                image.resize(size, Jimp.AUTO)
                const iamgeBuffer = await image.getBufferAsync(mime.lookup(getNameWithExt()))

                var objectParams = {
                    ContentType: mime.lookup(getNameWithExt()),
                    Bucket: process.env.AWS_BUCKET_NAME || 'moresneakers-images',
                    Key: getNameThumbnailForUrl(),
                    Body: iamgeBuffer
                };
                s3.putObject(objectParams, function (err, data) {
                    if (err) {
                        reject(false)
                    } else {
                        resolve(true)
                    }
                })

            } catch (error) {
                reject(false)
            }
        })
    }

    const existThumbnail = () => {
        
        if (!urlThumbnail) return false

        const urlWithoutThumbnail = urlThumbnail.replace('-thumbnail', '')
        return url == urlWithoutThumbnail
    }

    /**
     * http://buket-name.com/image-name.png
     * @returns image-name
     */
    const getNameForUrl = () => url.substring(0, url.lastIndexOf('.')).substring(url.lastIndexOf('/') + 1)

    /**
     * http://buket-name.com/image-name.png
     * @returns image-name.png
     */
    const getNameWithExt = () => url.substring(url.lastIndexOf('/') + 1)

    /**
     * http://buket-name.com/image-name.png
     * @returns image-name-thumbnail.png
     */
    const getNameThumbnailForUrl = () => {

        const name = getNameForUrl()
        return getNameWithExt().replace(name, name + '-thumbnail')
    }

    /**
     * http://buket-name.com/image-name.png
     * @returns http://buket-name.com/image-name-thumbnail.png
     */
    const getFullUrlThumbnail = () => process.env.IMAGE_URL + getNameThumbnailForUrl()

    return {
        getNameForUrl,
        getNameThumbnailForUrl,
        getFullUrlThumbnail,

        makeThumbnail
    }
}