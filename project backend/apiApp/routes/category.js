const router = require("express").Router()
const categoryController = require('../app/controller/category.controller')

router.get('/all', categoryController.all)

router.post('/add', categoryController.add)

router.delete('/del/:id', categoryController.delete)

module.exports = router