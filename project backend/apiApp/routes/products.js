const router = require("express").Router()
const ProductController =  require("../app/controller/product.controller")
const { authAdmin , auth } = require("../app/middleware/auth")

// For User
router.post("/add",  ProductController.add)
router.get("/all", auth, ProductController.all)
router.get("/single/:id", auth, ProductController.single)
router.get("/userProducts/:id", auth, ProductController.userProducts)

// Upload Image For User
const multer  = require('multer')
const upload = multer({ dest: 'public/' })
router.post('/profile',auth ,upload.single('img'),  ProductController.imgUpload)


// For Admin Only
router.patch("/edit/:id", authAdmin, ProductController.editProduct)
router.delete("/delete/:id", authAdmin, ProductController.delProduct)


module.exports = router