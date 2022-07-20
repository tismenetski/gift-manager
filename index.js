require('dotenv').config()
require('express-async-errors');
const express = require('express')
const db = require('./db/connectDB')
const authRouter = require('./routes/authRoutes')
const clientRouter = require('./routes/clientRoutes')
const employeeRouter = require('./routes/employeeRoutes')


const app = express()

app.use(express.json());

const port = process.env.PORT || 6060;

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/client', clientRouter)
app.use('/api/v1/employee', employeeRouter)

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