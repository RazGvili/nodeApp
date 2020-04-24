const mongoose = require('mongoose')
//const validator = require('validator')

const decisionSchema = new mongoose.Schema({

    desc: {
        type: String,
        required: true,
        // validate(val) {
        //     validations 
        //     throw new Error('bla')
        // }
    },
    proTitle: { type: String },
    conTitle: { type: String },
    pros: {
        type: [
            { 
                proCon: { type: String, required: true  }, 
                impact: { type: Number, required: true  },
                confidence: { type: Number, required: true  },
                effects: { type: Number, required: true  },
                type: { type: String, required: true  },
                id: { type: Number, required: true  }
            }
        ]
    },
    cons: {
        type: [
            { 
                proCon: { type: String, required: true   }, 
                impact: { type: Number, required: true  },
                confidence: { type: Number, required: true  },
                effects: { type: Number, required: true  },
                type: { type: String, required: true  },
                id: { type: Number, required: true  }
            }
        ]
    },
    comments: {
        type: [
            { 
                text:  { type: String, required: true  },
                name:  { type: String, required: true  },
                date:  { type: Date, required: true },
                threadID: { type: Date },
                likes: { type: Number }, 
            }
        ]
    },
    isReadOnly: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    }

}, {timestamps:true})


const Decision = mongoose.model('Decision', decisionSchema)

module.exports = Decision