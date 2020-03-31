const mongoose = require('mongoose')
const validator = require('validator')

const decisionSchema = new mongoose.Schema({

    desc: {
        type: String,
        require: true,
        validate(val) {
            // validations 
            // throw new Error('bla')
        }
    },
    pros: {
        type: [{ message: { type: String  } }]
    },
    cons: {
        type: [{ message: { type: String } }]
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {timestamps:true})



const Decision = mongoose.model('Decision', decisionSchema)

module.exports = Decision