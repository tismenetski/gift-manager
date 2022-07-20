const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const createClient = async(req,res) => {

    const user = req.user.userId;

    const {name,email,role,businessName,businessType,companySize} = req.body;


    const client = await Client.create({
        name,email,role,businessName,businessType,companySize, user
    })


    res.status(StatusCodes.CREATED).json({client})

}


const getClient = async(req,res) => {

    const user = req.user.userId;


    const client = await Client.findOne({user})

    if (!client) {
        throw new CustomError.NotFoundError('No company found for current user')
    }

    res.status(StatusCodes.OK).json({client})
}


module.exports = {
    createClient , getClient
}