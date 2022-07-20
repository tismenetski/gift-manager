const mongoose = require('mongoose')
const validator = require('validator')

const EmployeeSchema = new mongoose.Schema({

    name : {
        type : String,
        required: true,
        minLength : 2,
        maxLength : 100
    },
    email  :{
        type  : String,
        required : true,
        validate : {
            validator: validator.isEmail,
            message : 'Please provide valid email'
        }
    },
    department : {
        type  : String,
        maxLength : 100
    },
    job : {
        type : String,
        maxLength : 100
    },
    salary : {
        type : Number,
        min : 0,
        max : 200000000
    },
    workStartDate : {
        type : Date,
        min : '1970-01-01',
        max : Date.now()
    },
    client : {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true,
    },
    invited : {
        type : Boolean,
        default : false,
    },
    invitationLink : {
        type :String
    },
    registered : {
        type : Boolean,
        default: false
    }
})


module.exports = mongoose.model('Employee' , EmployeeSchema)