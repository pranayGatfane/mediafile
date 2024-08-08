const express = require('express')
const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

require('./config/db').connect()

const cloudinary = require('./config/cloudInary');
cloudinary.cloudinaryConnect()

// api routes
const upload = require('./routes/FileUpload')
app.use('/api/v1/upload',upload)


app.get('/',(req,res) =>{
    res.send("hey")
})