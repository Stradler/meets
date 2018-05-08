const multer = require('multer');

const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, '../pictures');
        },
        filename: function (req, file, next) {
            let extension  = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + extension);
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file){
            next();
        }
        let image = file.mimetype.startsWith('image/');
        if (image){
            next(null, true);
        } else {
            next({ message: 'Unsupported file type'}, false);
        }
    }
};



module.exports = multerConfig;