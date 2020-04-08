
const express = require('express')
var cors = require('cors')

// Assure file runs -> connect db
require('./dbm/mongoose')

const userRouter = require('./routers/user')
const decisionRouter = require('./routers/decision')

let app = express()
app.use(cors())
app.options('*', cors())

const port = process.env.PORT

// Parse incoming req 
app.use(express.json())

// Routes 
app.use(userRouter)
app.use(decisionRouter)


app.listen(port, () => {
    console.log("Server is up :) \nport --> " + port + "\n")
})