const mongoose = require('mongoose');
const config = require('config')
//const MongoClient = mongoose.MongoClient
const db = config.get('mongoURI')
const connectDB = async()=>{
    try{
        await mongoose.connect(db,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            createIndexes: true
        })
        console.log("Connected mongodb")
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}




module.exports = connectDB;