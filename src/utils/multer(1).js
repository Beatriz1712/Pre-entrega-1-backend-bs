import multer from 'multer'
import { dirname }from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(dirname(__filename))
//console.log('dirname:', __dirname);

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `${__dirname}/public/img`)
    },//nombre de la carpeta guarda img
    filename: function (req, file, cb) {
        console.log('multer',file);
        cb(null, `${Date.now()}-${file.originalname}`)
        
    },//nombre del archivo en que se va a guaradar
})

export const uploader = multer({storage})