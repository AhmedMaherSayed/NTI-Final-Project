const router = require("express").Router();
const {auth , authAdmin} = require("../app/middleware/auth")
const UserController = require('../app/controller/user.controller');


// User Routes
router.post("/register" ,UserController.register)
router.post("/login" ,UserController.login)
router.post("/logout", auth, UserController.logout)
router.post("/logoutAll", auth, UserController.logoutAll)
router.put("/edit", auth,  UserController.editMyData);
router.patch("/editPass/:id",auth , UserController.editPass)
router.delete("/delMe", auth, UserController.delMe)
router.get("/me", auth, UserController.me)

const multer  = require('multer')
const upload = multer({ dest: 'public/' })
router.post('/profile',auth ,upload.single('img'),  UserController.imgUpload)


// Admin Routes
router.get("/all",auth,authAdmin, UserController.all);
router.get('/single/:id', auth, authAdmin, UserController.single)
router.post("/edit/:id", auth, authAdmin, UserController.edit);
router.patch('/editStatus/:id', auth, authAdmin, UserController.changeStatus)
router.delete("/del/:id", auth, authAdmin, UserController.delete);
module.exports = router