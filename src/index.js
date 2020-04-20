
const os = require('os')
const cluster = require('cluster')

const express = require('express')
const compression = require('compression');
let cors = require('cors')

// Assure file runs -> connect db
require('./dbm/mongoose')

let log = require('./logger')

const userRouter = require('./routers/user')
const decisionRouter = require('./routers/decision')

let numCPUs = os.cpus().length

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

log.info(numCPUs)

app.listen(port, () => {
    log.info("Server is up, port --> %s", port)
})
