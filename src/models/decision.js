const mongoose = require('mongoose')
const validator = require('validator')

const Decision = mongoose.model('Decision', {
    desc: {
        type: String,
        require: true,
        validate(val) {
            // validations 
            // throw new Error('das)
        }
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Decision