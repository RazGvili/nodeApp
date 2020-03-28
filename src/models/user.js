const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        default: "Ano"
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is not valid')
            }
        }
    }
})

module.exports = User 