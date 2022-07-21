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

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// cloudinary setup
// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const app = express()
app.use(morgan('tiny'))
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


const port = process.env.PORT || 6060;

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/client', clientRouter)
app.use('/api/v1/employee', employeeRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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