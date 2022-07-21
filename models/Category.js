const mongoose = require('mongoose')



const CategorySchema = new mongoose.Schema({


    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        maxLength : 2000,
    },
    image : {
        type : String,
    },
    client : {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true,
    }


} , { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});

module.exports = mongoose.model('Category' , CategorySchema)