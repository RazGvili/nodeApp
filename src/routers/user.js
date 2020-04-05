const express = require('express')
const router = new express.Router()

const User = require('../models/user')

let _ = require('lodash')
const bcrypt = require('bcrypt')
const multer = require('multer')

// middleware 
const auth = require('../middleware/auth')

router.get('/users/me', auth, async (req, res) => {

    try {

        console.log("fetching user object: " + req.user.email)
        res.send(req.user)

    } catch (e) {
        console.log(e)
        res.status(400).send()
    }

})


router.patch('/users/me', auth, (req, res) => {

    // Assure only desired fields are being modified 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    if (!isValid) {
        return res.status(400).send({
            "err": "Invalid update",
            "invalidFields": invalidFields
        })
    }

    let user = req.user

    updates.forEach(update => user[update] = req.body[update])

    user.save().then((user) => {

        console.log("user " + user.email + " updated successfully \n")
        res.send(user)

    }).catch((err) => {

        console.log("user " + user.email + " update failed \n")
        res.status(500).send(err)

    })
})


const upload = multer({
    //dest: 'avatars', <-- if commented, passes binary data to next middleware 
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        // example of validation
        if(file.originalname.endsWith('.pdf')) {
            return cb(new Error('PDF not allowed'))
        }
        
        console.log(file)

        // call back 
        cb(undefined, true)
    }
})


router.post('/users/me/avatar', auth, upload.single('avatar'), (req, res) => {

    
    res.send()

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.post('/users/login', async (req, res) => {

    try {

        const user = await User.findByCred(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        console.log("user " + user.email + " logged in successfully")
        
        res.status(200).send({
            'user': user.getPublicProfile(),
            token
        })

    } catch (e) {

        console.log(e)

        res.status(400).send({
            "err": "login failed"
        })
    }

})


router.post('/users/logout', auth, async (req, res) => {

    try {

        let user = req.user
        let tokenToDelete = req.token

        console.log("user --->")
        console.log(user)

        // remove specific device token 
        user.tokens = user.tokens.filter((token) => {
            return token.token !== tokenToDelete
        })

        await user.save()

        console.log("user " + user.email + "logged out")

        res.send()

    } catch (e) {

        console.log("logout failed")
        console.log(e)
        res.status(500).send()  

    }

})


router.post('/users/logoutAll', auth, async (req, res) => {

    try {

        let user = req.user
        user.tokens = []

        await user.save()

        console.log("user " + user.email + " logged out \n")
        console.log("user --->")
        console.log(user)
        console.log("\n")

        res.send()

    } catch (e) {

        console.log("logoutAll failed \n")
        console.log(e)
        res.status(500).send()  

    }

})



router.post('/users', (req, res) => {

    if (_.isEmpty(req.body)) {
        return res.status(400).send({
            "err": "body is empty"
        })
    }

    // Assure only desired fields are being modified 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const invalidFields = _.difference(updates, allowedUpdates)

    if (!isValid) {
        return res.status(400).send({
            "err": "Invalid update",
            "invalidFields": invalidFields
        })
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {

        if (err) {
            return res.status(500).send({
                "err": err,
                "message": "hash failed"
            })

        } else {

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass
            })

            user.generateAuthToken().then(() => {

                console.log("new user, JWT generated for: " + user.email)
                return user.save()

            }).then(() => {

                console.log("new user saved: " + user.email + "\n")
                const token = user.tokens[0].token

                res.status(201).send({
                    'user': user.getPublicProfile(),
                    token
                })

            }).catch((err) => {

                res.status(500).send(err)
            })

        }
    })

})


router.delete('/users/me', auth, (req, res) => {

    const _id = req.user._id

    User.findById(_id).then((user) => {

        if (!user) {
            console.log("user " + user.email + " not found")
            throw new Error()
        }

        return user.deleteOne()

    }).then((user) => {

        console.log("user " + user.email +  " deleted successfully")
        res.send(req.user)

    }).catch((err) => {
        console.log("deleting user " + user.email + " failed")
        res.status(500).send(err)
    })
})


module.exports = router


