const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const cors = require('cors')
const app = express()

// Init middleware
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())

// Init DB
require('./dbs/init.mongodb')

// Init router
app.use('/', require('./routes'))

// Handle error
app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    return res.status(status).json({
        status: 'error',
        code: status,
        message: error.message || "Internal Server Error"
    })
})

module.exports = app
