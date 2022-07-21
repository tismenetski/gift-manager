const mongoose = require('mongoose')

const SingleCartItemSchema =new  mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const CartSchema = new mongoose.Schema({
    items : [SingleCartItemSchema],
    total : {
        type : Number,
        min : 0,
        default : 0
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    client : {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true,
    }

})

module.exports = mongoose.model('Cart' , CartSchema)