const mongoose = require('mongoose')



const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        maxLength : 2000,
    },
    price : {
        type : Number,
        required: true,
        min : 0,
    },
    images : {
        type : [],
    },
    colors : {
        type : [],
    },
    category : {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    client : {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true,
    }

})

module.exports = mongoose.model('Product' , ProductSchema)