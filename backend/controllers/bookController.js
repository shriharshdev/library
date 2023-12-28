const Book = require('../models/books')
const asynchandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");


exports.bookList = asynchandler(async(req,res,next) => {
    const bookList = await Book.find({}).sort({title: 1}).exec()
    res.render("book_list",{title:"Book List",books:bookList})
})

exports.bookGET = asynchandler(async(req,res,next) => {
    res.render("book_form",{title:"Add a new book..."})
})


exports.bookPOST = [
    body("name","Enter the name of the book...").trim().isLength({min:1}).escape().withMessage("Enter the name of the book..."),
    body("author","Enter the author of the book...").trim().isLength({min:1}).escape().withMessage("Enter the name of the author..."),
    body("price","Enter the price of the book...").trim().isNumeric().escape().withMessage("Enter the price of the book..."),

    asynchandler(async(req,res,next) => {
        const errors = validationResult(req)

        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
        })

        if(!errors.isEmpty()) {
            res.render("book_form",{
                title:"Add a new book",
                errors:errors.array()
            })
            return
        }else{
            await book.save()
            res.redirect('/library/books')
        }
    })

]
