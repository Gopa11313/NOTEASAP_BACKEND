const express=require('express');
const bodyparser=require('body-parser');
const R_Router=require("./Routes/Register_routes")
const UploadNote=require("./Routes/UploadNote_routes")
const Bookmark=require("./Routes/Bookmark_router")
const mongooes=require("./Databse/db")
const app=express();
app.use(express.json())
app.use(R_Router)
app.use(UploadNote)
app.use(Bookmark)
app.use(bodyparser.urlencoded({extended:false}))

app.listen(3000)