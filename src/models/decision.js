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
        type: [
            { 
                proCon: { type: String  }, 
                impact: { type: Number  },
                confidence: { type: Number  },
                effects: { type: Number  },
                type: { type: String  },
                id: { type: Number  }
            }
        ]
    },
    cons: {
        type: [
            { 
                proCon: { type: String  }, 
                impact: { type: Number  },
                confidence: { type: Number  },
                effects: { type: Number  },
                type: { type: String  },
                id: { type: Number  }
            }
        ]
    },
    comments: {
        type: [
            { 
                title: { type: String  }, 
                text: { type: String  },
                name: { type: String  },
                id: { type: Number  },
                likes: { type: Number  }, 
                disLikes: { type: Number  }
            }
        ]
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    }

}, {timestamps:true})



const Decision = mongoose.model('Decision', decisionSchema)

module.exports = Decision