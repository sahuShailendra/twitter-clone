const mongoose = require('mongoose')

function connectDB(){
        mongoose.connect(process.env.MONGOOSE_URI)
        .then(()=>{
            console.log("connected to database")
        })
        .catch((err)=>{
            console.log("Mongoose DB error ",err)
        })
}

module.exports = connectDB
