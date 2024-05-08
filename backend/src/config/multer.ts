import multer from 'multer'

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
        cb(null, allowed.includes(file.mimetype))
    },
})

export default upload