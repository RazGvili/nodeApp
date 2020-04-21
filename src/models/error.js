const mongoose = require('mongoose')
//const validator = require('validator')

const decisionSchema = new mongoose.Schema({

    errorMessage: {
        type: String,
        required: true,
    } 
}, {timestamps:true})


const Error = mongoose.model('Decision', decisionSchema)

module.exports = Error