const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.DB_URL;

exports.connect = () =>{
    mongoose.connect(db)
    .then(console.log(`connected to the db successfully`))
    .catch((e)=>{
        console.log("Failed to connect db")
        console.error(e)
        process.exit(1)
    })
}