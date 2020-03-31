
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, 'daredevil')
        const user = await User.findOne({ '_id': decodedToken._id, 'tokens.token': token })
        
        if (!user) {
            console.log("no user found")
            throw new Error()
        }

        // We already fetched the user        
        req.token = token
        req.user = user 

        next()
        
    } catch (e) {
        res.status(401).send({err: 'PLS authenticate'})
    }

}

module.exports = auth