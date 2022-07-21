const Category = require('../models/Category')
const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')
const Product = require("../models/Product");

const getAllCategories = async(req,res) => {

    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    const categories =  await Category.find({client : client._id}).populate('products')

    res.status(StatusCodes.OK).json({categories})
}

const createCategory = async(req,res) => {

    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    const {name,description} = req.body;

    const category = await Category.create({
        name,description, client : client._id
    })

    res.status(StatusCodes.CREATED).json({category})
}

const getSingleCategory = async(req,res) => {


    const userId = req.user.userId;

    const client = await Client.findOne({user : userId})

    const {id:categoryId}  = req.params;
    const category =  await Category.findOne({client : client._id , _id : categoryId}).populate('products')

    res.status(StatusCodes.OK).json({category})

}

const deleteCategory = async(req,res) => {

    const {id: categoryId} = req.params;
    const usedId = req.user.userId;

    const client = await Client.findOne({user : usedId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }

    const category =  await Category.findOneAndDelete({client : client._id , id : categoryId})

    if (!category) {
        throw new CustomError.NotFoundError('Category not found')
    }

    res.status(StatusCodes.OK).json({msg : 'Category deleted'})
}

const updateCategory = async(req,res) => {

    const {id: categoryId} = req.params;
    const usedId = req.user.userId;

    const client = await Client.findOne({user : usedId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }

    const {name,description} = req.body;
    const category =  await Product.findOneAndUpdate({client : client._id , id : categoryId} , {name,description} , {new : true,runValidators : true})

    if (!category) {
        throw new CustomError.NotFoundError('Category not found')
    }

    res.status(StatusCodes.OK).json({category})
}

module.exports = {
    getAllCategories , createCategory ,getSingleCategory , deleteCategory , updateCategory
}