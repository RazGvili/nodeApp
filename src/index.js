
const os = require('os')
const cluster = require('cluster')
let log = require('./logger')

// Code to run if we're in the master process
if (cluster.isMaster) {

    let numCPUs = os.cpus().length
    log.info("CPUs: %s", numCPUs)

    // Create a worker for each CPU
    for (var i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker,
        // we're not sentimental
        log.info('Worker %s died :(', worker.id);
        cluster.fork();

    })

// Code to run if we're in a worker process
} else {
    
    log.info('Worker %s running!', cluster.worker.id);

    // connect DB
    require('./dbm/mongoose')

    const express = require('express')
    const compression = require('compression')
    const cors = require('cors')
    
    const userRouter = require('./routers/user')
    const decisionRouter = require('./routers/decision')
    const helmet = require('helmet')

    const app = express()
    const port = process.env.PORT

    app.use(helmet())

    // CORS
    app.use(cors())
    app.options('*', cors())

    // compress all responses
    app.use(compression())

    // Parse incoming req 
    app.use(express.json())

    // Routes 
    app.use(userRouter)
    app.use(decisionRouter)


    app.listen(port, () => {
        log.info("Server is up, port --> %s", port)
    })

}
