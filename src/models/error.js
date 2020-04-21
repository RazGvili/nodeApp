const mongoose = require('mongoose')
//const validator = require('validator')

const errorSchema = new mongoose.Schema({

    errorMessage: {
        type: String,
        required: true,
    } 
}, {timestamps:true})


const ErrorReport = mongoose.model('ErrorReport', errorSchema)

module.exports = ErrorReport