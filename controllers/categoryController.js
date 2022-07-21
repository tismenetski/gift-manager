const Category = require('../models/Category')
const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const CustomError  = require('../errors')

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

    res.send('delete product')
}


const updateCategory = async(req,res) => {

    res.send('update product')
}



module.exports = {
    getAllCategories , createCategory ,getSingleCategory , deleteCategory , updateCategory
}