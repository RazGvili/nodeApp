const express = require('express')

// Assure file runs -> connect db
require('./db/mongoose')

// Models 
const User = require('./models/user')
const Decision = require('./models/Decision')

let _ = require('lodash')


const app = express()
const port = process.env.PORT || 3000 

// Parse incoming req 
app.use(express.json())

app.listen(port, () => {
    console.log("Server is up " + port)
})

// --------------------------------------------

app.get('/users/:id', (req, res) => {
    console.log(req.params)

    const _id = req.params.id

    User.findById(_id).then((user) => {

        if(!user) {
            return res.status(404).send("User not found")
        }

        res.send(user)

    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/users', (req, res) => {

    if(_.isEmpty(req.body)) {
        console.log("body is empty")
    }

    const user = new User(req.body)

    console.log(user)

    user.save().then(() => {    
        res.status(201).send(user)

    }).catch((err) => {
        res.status(400).send(err)
    })

})

// --------------------------------------------

app.post('/decisions', (req, res) => {

    if(_.isEmpty(req.body)) {
        console.log("body is empty")
    }

    const decision = new Decision(req.body)

    console.log(decision)

    decision.save().then(() => {    
        res.status(201).send(decision)

    }).catch((err) => {
        res.status(400).send(err)
    })

})