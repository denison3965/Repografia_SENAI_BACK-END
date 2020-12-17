const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                const filename = `${hash.toString('hex')}-${file.originalname}`

                cb(null, filename)
            })
        },
    }),
    limits: {

    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf'
        ]

        if (allowedMimes[0] == file.mimetype) {
            cb (null, true)
        }
    }
}