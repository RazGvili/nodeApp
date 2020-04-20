const express = require('express')
const router = new express.Router()

const Decision = require('../models/decision')

let _ = require('lodash')


// middleware 
const auth = require('../middleware/auth')

const parseDate = dateString => {
    const b = dateString.split(/\D+/);
    const offsetMult = dateString.indexOf('+') !== -1 ? -1 : 1;
    const hrOffset = offsetMult * (+b[7] || 0);
    const minOffset = offsetMult * (+b[8] || 0);  
    return new Date(Date.UTC(+b[0], +b[1] - 1, +b[2], +b[3] + hrOffset, +b[4] + minOffset, +b[5], +b[6] || 0));
};


// router.get('/decisions/:id', auth, (req, res) => {

//     console.log("task ID from params--> " + req.params.id)
//     console.log("user ID from auth--> " + req.user._id)

//     const _id = req.params.id
//     const user = req.user

//     Decision.findOne({
//         owner: user._id,
//         _id
//     }).then((decision) => {

//         if (!decision) {
//             return res.status(404).send({
//                 "err": "decision not found"
//             })
//         }

//         res.send(decision)

//     }).catch((err) => {
//         res.status(500).send(err)
//     })

// })

router.get('/decisions/:id', (req, res) => {

    console.log("task ID from params--> " + req.params.id)
    //console.log("user ID from auth--> " + req.user._id)

    const _id = req.params.id
    //const user = req.user

    Decision.findOne({
        _id
    }).then((decision) => {

        if (!decision) {
            return res.status(404).send({
                "err": "decision not found"
            })
        }

        console.log("successful get, returning --->")
        console.log(decision)
        console.log("\n")
        res.send(decision)

    }).catch((err) => {
        console.log(err)
        console.log("\n")
        res.status(500).send(err)
    })

})



router.get('/decisions', auth, (req, res) => {

    let match = {}
    const user = req.user
    
    if (req.query.completed) {

        console.log("req.query--->")
        console.log(req.query)
        console.log("\n")
        
        if (req.query.completed === 'true' || req.query.completed === 'false') {
            match.completed = req.query.completed === 'true'

        } else {
            console.log("invalid query param: " + req.query.completed)
        }
    
    } else {
        console.log("req.query---> Non received ")
    }   

    console.log("user ID from auth--> " + user._id)

    user.populate({
        path: 'decisions',
        match,
        options: {
            sort: {
                createdAt: -1
            }
        }

    }).execPopulate().then(() => {

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


router.patch('/decisions/:id', (req, res) => {

    // Assure only desired fields are being modified 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'completed', 'cons', 'pros', 'newComment', 'commentIdToDelete']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    console.log("req.body ========")
    console.log(req.body)
    console.log("================ \n")

    if (!isValid) {
        console.log("invalidFields")
        console.log(invalidFields)
        return res.status(400).send()
    }

    const _id = req.params.id
    console.log("task ID from params--> " + _id)

    Decision.findOne({
        _id,
    }).then((decision) => {

        if (!decision) {
            return res.status(404).send({
                "err": "decision not found"
            })
        }

        updates.forEach((update) => {

            if (update === 'newComment') {

                let newComment = req.body.newComment
                newComment.date = new Date()

                console.log("Adding comment")
                console.log(newComment)

                decision.comments = decision.comments.concat(newComment)
            } 

            if (update === 'commentIdToDelete') {

                console.log("Deleting comment with id --> " + req.body.commentIdToDelete)

                //let now = new Date()
                decision.comments = decision.comments.filter((commentIter) => {
                    
                    if (commentIter._id !== req.body.idToDelete) {
                        return commentIter
                    }

                })
            } 

            if (update !== 'newComment' && update !== 'commentIdToDelete') {

                decision[update] = req.body[[update]]
            }
        })

        return decision

    }).then((decision) => {

        console.log("saving -->")
        console.log(decision)
        return decision.save()
        
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


// router.post('/decisions', auth, (req, res) => {

//     if (_.isEmpty(req.body)) {
//         return res.status(400).send({
//             "err": "body is empty"
//         })
//     }

//     const decision = new Decision({
//         ...req.body,
//         owner: req.user._id
//     })

//     console.log("Decision object to save --->")
//     console.log(decision)

//     decision.save().then((decision) => {

//         console.log("Decision object saved! \n")
//         res.status(201).send(decision)

//     }).catch((err) => {

//         console.log("Decision object save failed! \n")
//         console.log(err)
//         res.status(400).send({
//             err
//         })

//     })

// })



router.post('/decisions', (req, res) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send({
            "err": "body is empty"
        })
    }

    console.log("req.body ========")
    console.log(req.body)
    console.log("================ \n")

    const decision = new Decision({
        ...req.body,
    })

    console.log("Decision object to save --->")
    console.log(decision)

    decision.save().then((decision) => {

        console.log("Decision object saved! \n")
        res.status(201).send(decision)

    }).catch((err) => {

        console.log("Decision object save failed! \n")
        console.log(err)
        res.status(400).send({ err })

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