const Employee = require('../models/Employee')
const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')

const getEmployees = async(req,res) => {

    const userId = req.user.userId;
    const client = await Client.findOne({user : userId})

    if (!client) {
        throw CustomError.BadRequestError('Bad request')

    }

    const employees = await Employee.find({client : client._id})


    res.status(StatusCodes.OK).json({employees , count : employees.length})

}

const createEmployee = async(req,res) => {

    const {name,email,department,job,workStartDate,salary} = req.body;

    if (!name || !email) {
        throw CustomError.BadRequestError('Please provide name and email')
    }

    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    if (!client) {
        throw CustomError.BadRequestError('Bad request')

    }

    const employee = await Employee.create({
        name,email,department,job,workStartDate,salary, client: client._id
    })

    res.status(StatusCodes.CREATED).json({employee})

}

const sendInvitationLink = async(req,res) => {

    const {id:employeeId} = req.params;

    const client = await Client.findOne({user : req.user.userId})

    if (!client) {
        throw new CustomError.BadRequestError('Bad request')

    }

    const employee = await Employee.findOne({client : client._id , _id : employeeId})

    if (!employee) {
        throw new CustomError.BadRequestError('Employee not found')

    }

    await employee.sendInvitation();

    res.status(StatusCodes.OK).json({msg : 'invitation sent!'})


}

const importEmployees = async(req,res) => {

    res.send('import employees')
}

const exportEmployees = async(req,res) => {

    res.send('export employees')
}

const getSingleEmployee = async(req,res) => {

    const {id:employeeId} = req.params;

    const client = await Client.findOne({user : req.user.userId})

    if (!client) {
        throw new CustomError.BadRequestError('Bad request')

    }

    const employee = await Employee.findOne({client : client._id , _id : employeeId})

    if (!employee) {
        throw new CustomError.BadRequestError('Employee not found')

    }
    res.status(StatusCodes.OK).json({employee})
}



const updateEmployee = async(req,res) => {

    const {id:employeeId} = req.params;

    const client = await Client.findOne({user : req.user.userId})

    if (!client) {
        throw new CustomError.BadRequestError('Bad request')

    }

    const  {name,department,job,workStartDate,salary } = req.body;

    const employee = await Employee.findOneAndUpdate({client : client._id , _id : employeeId} , {name,department,job,workStartDate,salary} , {new: true, runValidators: true})

    if (!employee) {
        throw new CustomError.BadRequestError('Employee not found')

    }
    res.status(StatusCodes.OK).json({employee})

}

const deleteEmployee = async(req,res) => {

    res.send('delete employee')
}


const getEmployeeUser = async(req,res) => {

    const {email} = req.body;
    const userId = req.user.userId

    const employee = await Employee.findOne({user : userId , email})

    if (!employee) {
        throw new CustomError.BadRequestError('Employee not found')
    }

    res.status(StatusCodes.OK).json({employee})
}



module.exports = {
    getEmployees,createEmployee, getSingleEmployee , deleteEmployee, updateEmployee , importEmployees , exportEmployees , sendInvitationLink ,getEmployeeUser
}