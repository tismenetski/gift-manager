const Employee = require('../models/Employee')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')



const getEmployees = async(req,res) => {

    res.send('get employees')
}

const createEmployee = async(req,res) => {

    res.send('create employee')
}

const getSingleEmployee = async(req,res) => {

    res.send('get single employee')
}

const updateEmployee = async(req,res) => {

    res.send('update employee')
}

const deleteEmployee = async(req,res) => {

    res.send('delete employee')
}




module.exports = {
    getEmployees,createEmployee, getSingleEmployee , deleteEmployee, updateEmployee
}