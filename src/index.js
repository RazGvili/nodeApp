
const express = require('express')

// Assure file runs -> connect db
require('./db/mongoose')

const userRouter = require('./routers/user')
const decisionRouter = require('./routers/decision')


const app = express()
const port = process.env.PORT || 3000 

// Parse incoming req 
app.use(express.json())

// Routes 
app.use(userRouter)
app.use(decisionRouter)


app.listen(port, () => {
    console.log("Server is up :) " + port)
})