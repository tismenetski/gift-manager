const Product = require('../models/Product')
const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')

const getAllProducts = async(req,res) => {

    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }


    const products =  await Product.find({client : client._id})


    res.status(StatusCodes.OK).json({products})
}

const createProduct = async(req,res) => {

    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    const {name,price,description,colors,category} = req.body;

    const product = await Product.create({
        name,price,description,colors,category, client : client._id
    })

    res.status(StatusCodes.CREATED).json({product})
}

const getSingleProduct = async(req,res) => {

    res.send('get single product')
}





const deleteProduct = async(req,res) => {

    res.send('delete product')
}


const updateProduct = async(req,res) => {

    res.send('update product')
}



module.exports = {
    getAllProducts , createProduct ,getSingleProduct , deleteProduct , updateProduct
}