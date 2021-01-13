const express=require('express');
const bodyparser=require('body-parser');
const R_Router=require("./Routes/Register_routes")
const UploadNote=require("./Routes/UploadNote_routes")
const mongooes=require("./Databse/db")
const app=express();
app.use(express.json())//multer
app.use(R_Router)
app.use(UploadNote)
app.use(bodyparser.urlencoded({extended:false}))

app.listen(3000)