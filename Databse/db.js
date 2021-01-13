const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Insta',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
module.exports=mongoose