const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Decision = require('./decision')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        default: "Ano"
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is not valid')
            }
        }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, { timestamps: true })


userSchema.virtual('decisions', {

    ref : 'Decision',        // The model to use
    localField: '_id',      // Find people where `localField`
    foreignField: 'owner', // field to connect other model 
})


// Accessible via instance of User model 
userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_STR )

    // save the token to the user instance 
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token

}

userSchema.methods.getPublicProfile = function () {

    const user = this
    const publicProfile = user.toObject()

    delete publicProfile.password
    delete publicProfile.tokens

    return publicProfile

}


userSchema.statics.findByCred = async (email, password) => {

    console.log("email: " + email)
    const user = await User.findOne({
        email
    })

    if (!user) {
        console.log("err: no user was found")
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        console.log("err: passwords not matching")
        throw new Error('Unable to login')

    } else {

        return user
    }
}


// Delete user decisions when his removed middleware
userSchema.pre('deleteOne', { document: true }, function (next) {

    const user = this

    console.log("removing ---> " + user.email)
    console.log(user)

    Decision.deleteMany({ owner: user._id }).then(() => {

        console.log("user " + user.email + " decisions deleted")
        next()

    }).catch((err) => {

        console.log("user " + user.email + " decisions not deleted")
        console.log(err)

    })
})


userSchema.plugin(uniqueValidator, {
    message: 'email is already taken.'
})

const User = mongoose.model('User', userSchema)


module.exports = User