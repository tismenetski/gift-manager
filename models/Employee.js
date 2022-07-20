const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const sendInvitation = require('../utils/sendInvitation')

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
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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
} , {timestamps: true})

EmployeeSchema.pre('save' , async function () {
    // if (!this.isModified('password')) return;
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);


})

EmployeeSchema.methods.sendInvitation = async function () {

    const origin = process.env.ORIGIN
    const invitationLink = crypto.randomBytes(70).toString('hex')
    await sendInvitation({name: this.name,email : this.email,  invitationLink , origin })
    this.invitationLink = invitationLink;
    this.invited = true;
    await this.save()
}


module.exports = mongoose.model('Employee' , EmployeeSchema)