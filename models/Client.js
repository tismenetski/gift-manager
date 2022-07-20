const mongoose = require('mongoose')



const ClientSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    businessName : {
        type: String,
        required: true,
    },
    businessType : {
        type: String,
        required: true,
    },
    companySize : {
        type: Number,
        required: true,
        enum : [10,50,100,500,1000,10000]
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }

} , {timestamps: true})



module.exports = mongoose.model('Client', ClientSchema)

