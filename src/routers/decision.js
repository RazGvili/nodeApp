const express = require('express')
const router = new express.Router()

const Decision = require('../models/decision')

let _ = require('lodash')


// middleware 
const auth = require('../middleware/auth')


router.get('/decisions/:id', auth, (req, res) => {

    console.log("task ID from params--> " + req.params.id)
    console.log("user ID from auth--> " + req.user._id)

    const _id = req.params.id
    const user = req.user

    Decision.findOne({
        owner: user._id,
        _id
    }).then((decision) => {

        if (!decision) {
            return res.status(404).send({
                "err": "decision not found"
            })
        }

        res.send(decision)

    }).catch((err) => {
        res.status(500).send(err)
    })

})



router.get('/decisions', auth, (req, res) => {

    const user = req.user
    console.log("user ID from auth--> " + user._id)

    user.populate('decisions').execPopulate().then(() => {

        if (!user.decisions) {
            return res.status(404).send({
                "err": "decisions not found"
            })
        }

        console.log("decisions --->")
        console.log(user.decisions)
        console.log("\n")

        res.send(user.decisions)

    }).catch((err) => {

        console.log(err)
        res.status(500).send({
            "err": err
        })
    })



})


router.patch('/decisions/:id', auth, (req, res) => {

    // Assure only desired fields are being modified 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'completed', 'cons', 'pros']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    if (!isValid) {
        return res.status(400).send({
            "err": "Invalid update",
            "invalidFields": invalidFields
        })
    }

    const _id = req.params.id
    const user = req.user

    console.log("user ID from auth--> " + user._id)
    console.log("task ID from params--> " + _id)

    Decision.findOne({
        _id,
        owner: user._id
    }).then((decision) => {

        if (!decision) {
            return res.status(404).send({
                "err": "decision not found"
            })
        }

        updates.forEach((update => decision[update] = req.body[[update]]))
        return decision

    }).then((decision) => {

        console.log("decision updated & saved, sending.. \n")
        res.send(decision)

    }).catch((err) => {

        console.log(err)
        res.status(500).send({
            "err": "Update decision fail"
        })
    })

})


router.post('/decisions', auth, (req, res) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send({
            "err": "body is empty"
        })
    }

    const decision = new Decision({
        ...req.body,
        owner: req.user._id
    })

    console.log("Decision object to save --->")
    console.log(decision)

    decision.save().then((decision) => {

        console.log("Decision object saved! \n")
        res.status(201).send(decision)

    }).catch((err) => {

        console.log("Decision object save failed! \n")
        console.log(err)
        res.status(400).send({
            err
        })

    })

})


router.delete('/decisions/:id', auth, (req, res) => {

    const _id = req.params.id
    const user = req.user

    console.log("user ID from auth--> " + user._id)
    console.log("task ID from params--> " + _id)

    Decision.findOneAndDelete({
        _id,
        owner: user._id
    }).then((decision) => {

        if (!decision) {

            console.log("decision not found")

            return res.status(404).send({
                "err": "Delete decision fail"
            })
        }

        console.log("decision deleted")
        res.send(decision)

    }).catch((err) => {

        console.log(err)
        res.status(500).send({
            "err": "Delete decision fail"
        })
    })
})


module.exports = router