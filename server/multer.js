import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const whitelist = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/jpg",
    "image/gif"
  ]

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,`./images`))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Math.round(Math.random() * 130 ** 5 * Math.random() * 2) + path.extname(file.originalname))
    },
  })
  const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
          if(whitelist.includes(file.mimetype)){
              return cb(null,true)
          }
          else {
            return cb({message:"Формат файла должен быть jpeg, jpg, pjpeg ,png, gif"},false)
          }
      },
      limits:{
          fileSize: (1024 * 1024) * 2,
      }
  })

export default upload