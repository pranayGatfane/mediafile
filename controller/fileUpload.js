const File = require('../models/File')
const cloudinary = require('cloudinary').v2

// localFileUpload -> handler function
    exports.localFileUPload = async(req,res)=>{
        try {
            // fetch file from request 
            // here ".file" is key 
            //".files" is directory name

            // const file = req.files.file;//.file key we can name it 
            const file = req.files.pranayData; //.pranayData key
            console.log("file",file)

            //created file and it rename it in date millisecond ->date.now()
            let path = __dirname + "/imgfile/" + Date.now() + "." + `${file.name.split('.')[1]}`;
            console.log("path",path)

            // move path on this direactory ==> here's "controller/files"
            file.mv(path,(err) =>{
                console.log(err)
            })
            res.json({
                success:true,
                message:"local file uploaded successfully"
            })
        } catch (error) {
            // console.log("could not connect to upload")
            console.log(error)
        }
    }

    
    function isFileTypeSupported(type, supportedTypes){
        return supportedTypes.includes(type)
    }
    
    async function uploadFileToCloudinary(file, folder,quality){
        const options = {folder};
        console.log("temp file path ",file.tempFilePath)
        if(quality){
            options.quality = quality
        }
        // args temp file and options
        options.resource_type = "auto";
        const result =  await cloudinary.uploader.upload(file.tempFilePath,options);
        return result
        
    }

// image upload
    exports.imgUpload =async(req,res) =>{

        try {
            const{name, tags, email} = req.body;
            console.log(name, email, tags)

            const file =req.files.imgfile;
            console.log(file)

            // validation
            const supportedTypes = ["jpg","png","jpeg"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("file type", fileType)

            if(!isFileTypeSupported(fileType, supportedTypes)){
                return res.status(400).json({
                    success:false,
                    msg:"file format not supported"
                })
            }

             // file format supported 
             const imgResponse = await uploadFileToCloudinary(file,'pranay_cloud_img')
            console.log("response",imgResponse,"response")

            // db connection
            const fileData = await File.create({
                name, tags, email, imageUrl:imgResponse.secure_url
            })
            res.json({
                success:true,
                imageUrl:imgResponse.secure_url,
                msg:"file format supported successfully"
            })

        } catch (error) {
            console.error(error)
            res.status(400).json({
                success:false,
                msg:"unable to upload img, something went wrong",
            })
        }
    }

//  video upload
    exports.vidUpload = async(req,res) =>{
        try {
            const{name, tags, email} = req.body;
            console.log(name, tags, email);

            const file = req.files.vidfile;

            // validation 
            const supportedTypes = ["mp4","mov"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("file type", fileType)

            //if greater than 5 mb
            if(!isFileTypeSupported(fileType,supportedTypes)){
                return res.status(400).json({
                    success:false,
                    msg:"file format not supported"
                })
            }

            console.log("uploading to pranay cloud img")
            const vidresponse = await uploadFileToCloudinary(file, "pranay_cloud_img")
            console.log("video",vidresponse,"video")


            // db connection
            const fileData = await File.create({
                name, tags, email,imageUrl:vidresponse.secure_url
            })
            res.json({
                success:true,
                imageUrl:vidresponse.secure_url,
                msg:"video file format supported successfully"
            })

        } catch (error) {
            res.status(400).json({
                success:false,
                msg:"something went wrong while uploading video"
            })
        }
    }

// image Size reducer
    exports.imagSizeReducer = async(req,res) =>{
        try {
            const{name, tags, email} = req.body;
            console.log(name, tags, email);
    
            const file = req.files.reduceimgfile;

            // validation 
            const supportedTypes = ["jpg"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("file type", fileType)

            //if greater than 5 mb
            if(!isFileTypeSupported(fileType,supportedTypes)){
                return res.status(400).json({
                    success:false,
                    msg:"file format not supported"
                })
            }

            console.log("uploading to pranay cloud img")
            // const imgreduceresponse = await uploadFileToCloudinary(file, "pranay_cloud_img",30)
            const imgreduceresponse = await uploadFileToCloudinary(file, "pranay_cloud_img",90)
            console.log("video",imgreduceresponse,"video")

            // db connection
            const fileData = await File.create({
                name, tags, email,imageUrl:imgreduceresponse.secure_url
            })
            res.json({
                success:true,
                imageUrl:imgreduceresponse.secure_url,
                msg:"reduce img supported successfully"
            })
        } catch (error) {
            res.status(400).json({
            success:false,
            msg:"something went wrong while uploading video"
         })
        }
    }
       
 

    

    
            
    

    
    
            
    
       
     