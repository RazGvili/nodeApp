const mongoose = require('mongoose')

mongoose.connect(process.env.MON_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Mongodb connected \n"))
.catch(err => console.log(err))