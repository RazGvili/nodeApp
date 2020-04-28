const express = require('express')
const router = new express.Router()

const Decision = require('../models/decision')
const ErrorReport = require('../models/error')

let _ = require('lodash')
let log = require('../logger')

// middleware 
//const auth = require('../middleware/auth')


router.get('/decisions/:id', (req, res) => {

    log.info("task ID from params--> %s",req.params.id)

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

        log.info("successful get, returning ---> \n")
        log.info({dec: decision})
        res.send(decision)

    }).catch((err) => {
        log.info({err: err})
        res.status(500).send(err)
    })

})


router.patch('/decisions/:did/comment/:cid', (req, res) => {

    log.info("================")
    log.info({req: req.body})
    log.info("================")

    const updates = Object.keys(req.body)
    const allowedUpdates = ['add']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    if (!isValid) {
        log.info("invalidFields")
        log.info({invalidFields})
        return res.status(400).send()
    }

    const decisionId = req.params.did
    const commentId = req.params.cid
    const add = req.body.add

    log.info({decisionId, commentId, add})

    Decision.findOne({
        decisionId,
    }).then((decision) => {

        log.info({decision})

        if (!decision) {
            log.info("decision not found")
            return res.status(404).send({
                "err": "decision not found"
            })
        }

        let comment

        try {
            comment = decision.comments.id(commentId)
        } catch(e) {
            log.info({e})
            throw new Error("id failed")
        }

        if (!comment) {
            log.info("comment not found")
            return res.status(404).send({
                "err": "comment not found"
            })
        }

        try {
            comment.likes = add ? comment.likes + 1 : comment.likes - 1
        } catch(e) {
            log.info({e})
            throw new Error("add failed")
        }

        
        return comment.save()
        
    }).then((comment) => {

        log.info("saving -------->")
        log.info({comment})
        log.info("comment updated & saved!  \n")
        res.send(comment)
        
    }).catch((err) => {

        log.info({err: err})
        res.status(500).send({
            "err": "Update comment fail"
        })
    })
})


router.patch('/decisions/:id', (req, res) => {

    // Assure only desired fields are being modified 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'completed', 'cons', 'pros', 'newComment', 'commentIdToDelete']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    log.info("================")
    log.info({req: req.body})
    log.info("================")

    if (!isValid) {
        log.info("invalidFields")
        log.info(invalidFields)
        return res.status(400).send()
    }

    const _id = req.params.id
    log.info("task ID from params--> %s", _id)

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

                log.info("Adding comment")
                log.info({newComment: newComment})

                decision.comments = decision.comments.concat(newComment)
            } 

            if (update === 'commentIdToDelete') {

                log.info("Deleting comment with id --> %s", req.body.commentIdToDelete)
                decision.comments = decision.comments.filter((commentIter) => {commentIter._id !== req.body.idToDelete})
            } 

            if (update !== 'newComment' && update !== 'commentIdToDelete') {

                decision[update] = req.body[[update]]
            }
        })

        
        return decision.save()

    }).then((decision) => {

        log.info("saving -------->")
        log.info({decision: decision})
        log.info("decision updated & saved!  \n")
        res.send(decision)

    }).catch((err) => {

        log.info({err: err})
        res.status(500).send({
            "err": "Update decision fail"
        })
    })

})


router.post('/decisions', (req, res) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send({
            "err": "body is empty"
        })
    }

    log.info("================")
    log.info({req: req.body})
    log.info("================")

    const decision = new Decision({
        ...req.body,
    })

    log.info("Decision object to save --->")
    log.info({decision: decision})

    decision.save().then((decision) => {

        log.info("Decision object saved! \n")
        res.status(201).send(decision)

    }).catch((err) => {

        log.info("Decision object save failed! \n")
        log.info({err: err})
        res.status(400).send({ err })

    })

})


router.post('/error', (req, res) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send({
            "err": "body is empty"
        })
    }

    log.info("================")
    log.info({req: req.body})
    log.info("================")

    const error = new ErrorReport({
        ...req.body,
    })

    log.info("error object to save --->")
    log.info({error: error})

    error.save().then((error) => {

        log.info("error object saved! \n")
        res.status(200)

    }).catch((err) => {

        log.info("Decision object save failed! \n")
        log.info({err: err})
        res.status(500).send({
            "err": "Update decision fail"
        })
    })

})



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



// router.delete('/decisions/:id', auth, (req, res) => {

//     const _id = req.params.id
//     const user = req.user

//     Decision.findOneAndDelete({
//         _id,
//         owner: user._id
//     }).then((decision) => {

//         if (!decision) {

//             console.log("decision not found")

//             return res.status(404).send({
//                 "err": "Delete decision fail"
//             })
//         }

//         console.log("decision deleted")
//         res.send(decision)

//     }).catch((err) => {

//         console.log(err)
//         res.status(500).send({
//             "err": "Delete decision fail"
//         })
//     })
// })




// router.get('/decisions', auth, (req, res) => {

//     let match = {}
//     const user = req.user
    
//     if (req.query.completed) {

//         console.log("req.query--->")
//         console.log(req.query)
//         console.log("\n")
        
//         if (req.query.completed === 'true' || req.query.completed === 'false') {
//             match.completed = req.query.completed === 'true'

//         } else {
//             console.log("invalid query param: " + req.query.completed)
//         }
    
//     } else {
//         console.log("req.query---> Non received ")
//     }   

//     console.log("user ID from auth--> " + user._id)

//     user.populate({
//         path: 'decisions',
//         match,
//         options: {
//             sort: {
//                 createdAt: -1
//             }
//         }

//     }).execPopulate().then(() => {

//         if (!user.decisions) {
//             return res.status(404).send({
//                 "err": "decisions not found"
//             })
//         }

//         console.log("decisions --->")
//         console.log(user.decisions)
//         console.log("\n")

//         res.send(user.decisions)

//     }).catch((err) => {

//         console.log(err)
//         res.status(500).send({
//             "err": err
//         })
//     })
// })


module.exports = router