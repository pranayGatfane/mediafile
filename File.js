const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
})

// post middleware use before exports 
    fileSchema.post("save", async function(doc){
        try {
            console.log("doc",doc)
            
        // transporter 
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
                },
            })
            let info = await transporter.sendMail({
                from:`pranay_file_upload_test`,
                to:doc.email,
                subject:"new file uploaded on cloudinary",
                html:`<h2>hey there </h2><p>File upload </p> <p>to check <a href=${doc.imageUrl}>click here </a></p> `
            })

            console.log(info)


        } catch (error) {
            console.log(error)
        }
    })

const File = mongoose.model("File",fileSchema)
module.exports=File;