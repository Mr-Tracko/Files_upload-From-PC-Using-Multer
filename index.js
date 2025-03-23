const path = require("path");
const express = require("express");
const multer  = require('multer');

const PORT = 8001;

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null , "./uploads")
    }, //Destination is the folder where the Client wants to save his/her file    this have three parametres .. req is the req made by user(basically to upload the file) .. file is the particular file which the user is trying to upload .. and cb is the callback function .. that if the file executes .. then that call back function will execute its code
    filename: function (req, file, cb){
        return cb(null , `${Date.now()}-${file.originalname}`);
    }, //yha filename .. jo uploads m hmaari file save hogi , uska kya naam rkhna chaiye .. vo hogaa .. ab here , we cann't use the same file name because if the user uploads the same file twice .. then both the files will over-ride in that folder
});

const upload = multer({ storage });

const app = express();

app.set("view engine",  "ejs");
app.set("views" , path.resolve("./views"));

// const upload = multer({ dest: 'uploads/' }); //iska mtlb kii saari files jo jo upload ho rhi h .. vo sb uss upload folder m daal do

app.use(express.urlencoded({ extended : false }));
//this is because the data from the frontend is not the json data , it's the formed data .. soo , we use urlencoded for it. 

app.get("/" , (req , res) => {
    return res.render("homepage");
})

app.post("/upload" ,upload.single("profileImage") , (req,res) => {
    //here , upload.single is single .. bcz here we are taking only one file as a input at a time .. if we want to upload more than one file at a time .. it will use the upload.array([  ]) .. (read the article from Multer);
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

//now , our files got pushed into the uploads folder .. but we cann't access the files .. 
//For it .. we use Disk Storage Property of Multer ..
//Disk Storage hme full control deta h kii disk k upr files ko store kse krna h.

app.listen(PORT , console.log(`Server Started at PORT : ${PORT}`));
