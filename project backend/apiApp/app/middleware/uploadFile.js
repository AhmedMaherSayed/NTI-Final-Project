const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // fs.mkdirSync("public/images")
        const myLoc = "public/images"
        cb(null, myLoc)
    },
    filename: function(req, file, cb){
        const myName = file.fieldname+"-"+Date.now()+path.extname(file.originalname)
        cb(null, myName)
    }
})
const upload = multer({
    storage,
    limits:{ fileSize: 200000000 }
})
module.exports = upload