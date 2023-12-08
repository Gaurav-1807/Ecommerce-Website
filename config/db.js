const mongoose = require('mongoose')

const connect =async()=>{
    await mongoose.connect(`mongodb+srv://gauravambaliya77:token@cluster0.bdj5crc.mongodb.net/project?retryWrites=true&w=majority`)
    console.log("Connect to MongoDB")
}

module.exports = connect