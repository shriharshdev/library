const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')


router.get("/books", bookController.bookList)

router.get("/books/create", bookController.bookGET)
router.post("/books/create", bookController.bookPOST)

module.exports = router;