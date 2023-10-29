const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const app = express()

// Init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

// Init DB
require('./dbs/init.mongodb')

// Init router
app.use('/', require('./routes'))

// Handle error

module.exports = app
