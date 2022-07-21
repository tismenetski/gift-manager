require('dotenv').config()
require('express-async-errors');
const express = require('express')
const db = require('./db/connectDB')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes')
const clientRouter = require('./routes/clientRoutes')
const employeeRouter = require('./routes/employeeRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')

const app = express()
app.use(morgan('tiny'))
app.use(express.json());
app.use(fileUpload());


const port = process.env.PORT || 6060;

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/client', clientRouter)
app.use('/api/v1/employee', employeeRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const start = async() => {

    try {
        await db(process.env.MONGO_URI)
        app.listen(port , () => {
            console.log(`App listening on port ${port}`)
        })
    }catch (error) {
        console.log(error)
    }
}


start()