const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 100,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator: validator.isEmail,
            message : 'Please provide valid email'
        }
    },
    password : {
        type : String,
        required : true,
        minLength: 8,
    },
    role : {
        type : String,
        required : true,
        enum : ['user', 'admin' , 'moderator'],
        default : 'user'
    },

} , {timestamps: true})

UserSchema.pre('save' , async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}


module.exports = mongoose.model('User' , UserSchema)