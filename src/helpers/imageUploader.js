const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    limits: {
        fileSize: 8000000 // Compliant: 8MB
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../images/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`)
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        return cb(null, false)
    }
}

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 8000000 // Compliant: 8MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

module.exports = {
    upload: upload
}