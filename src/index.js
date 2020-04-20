
const express = require('express')
const compression = require('compression');
let cors = require('cors')

// Assure file runs -> connect db
require('./dbm/mongoose')

let log = require('./logger')

const userRouter = require('./routers/user')
const decisionRouter = require('./routers/decision')

let app = express()
app.use(cors())
app.options('*', cors())

// compress all responses
app.use(compression())

const port = process.env.PORT

// Parse incoming req 
app.use(express.json())

// Routes 
app.use(userRouter)
app.use(decisionRouter)


app.listen(port, () => {
    log.info("Server is up :) \nport --> " + port + "\n")
})