const Product = require('../models/Product')
const Client = require('../models/Client')
const {StatusCodes} = require('http-status-codes')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
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

    const images = req.files.image;

    let productImagesUrls = []
    for (const image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath,{use_filename : true,folder: 'products'})
        console.log(result)
        fs.unlinkSync(image.tempFilePath)
        productImagesUrls = [...productImagesUrls, result.secure_url]
    }

    const product = await Product.create({
        name,price,description,images : productImagesUrls,colors,category, client : client._id
    })

    res.status(StatusCodes.CREATED).json({product})
}

const getSingleProduct = async(req,res) => {

    const {id: productId} = req.params;
    const usedId = req.user.userId;

    const client = await Client.findOne({user : usedId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }

    const product =  await Product.findOne({client : client._id , id : productId})

    if (!product) {
        throw new CustomError.NotFoundError('Product not found')
    }

    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async(req,res) => {

    const {id: productId} = req.params;
    const usedId = req.user.userId;

    const client = await Client.findOne({user : usedId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }

    const product =  await Product.findOneAndDelete({client : client._id , id : productId})

    if (!product) {
        throw new CustomError.NotFoundError('Product not found')
    }

    res.status(StatusCodes.OK).json({msg : 'Product deleted'})
}

const updateProduct = async(req,res) => {

    const {id: productId} = req.params;
    const usedId = req.user.userId;

    const client = await Client.findOne({user : usedId})

    if (!client) {
        throw new CustomError.UnauthorizedError('Invalid Credentials')
    }

    const {category,name,description,price,colors} = req.body;
    const product =  await Product.findOneAndUpdate({client : client._id , id : productId} , {category,name,description,price,colors} , {new : true,runValidators : true})

    if (!product) {
        throw new CustomError.NotFoundError('Product not found')
    }

    res.status(StatusCodes.OK).json({product})
}

module.exports = {
    getAllProducts , createProduct ,getSingleProduct , deleteProduct , updateProduct
}