const User = require('../models/User')
const Employee = require('../models/Employee')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')


const register = async(req,res) => {

    const {name,email,password} = req.body;

    const emailAlreadyExists = await User.findOne({email})

    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    const user = (await User.create({name, email, password, role: 'admin'}))
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name: user.name} , token})
}

const login = async(req,res) => {

    const {email,password} = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const logout = async(req,res) => {

    res.send('logout')
}


const registerEmployee = async(req,res) => {

    const {invitationLink,email,password} = req.body;

    const user  = await User.findOne({email})

    if (user) {
        throw new CustomError.BadRequestError('User Already registered')
    }

    const employee = await Employee.findOne({email, invitationLink})

    if (!employee) {
        throw new CustomError.UnauthenticatedError('Invalid link')

    }

    const newUser = await User.create({
        email, password, name: employee.name, role : 'user',
    })

    employee.user = newUser._id;
    employee.registered = true;
    employee.invitationLink = ''
    await employee.save()

    res.status(StatusCodes.CREATED).json({user : newUser})

}

module.exports = {
    register ,login ,logout ,registerEmployee
}