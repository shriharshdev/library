const mongoose = require('mongoose')

// const Schema = mongoose.Schema()

const BookSchema = new mongoose.Schema({
    name:{type:String, required:true},
    author:{type:String, required:true},
    price:{type:Number, required:true}
})

module.exports = mongoose.model('Book', BookSchema)