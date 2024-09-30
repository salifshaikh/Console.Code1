const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://consolecode:Suban@2004@cluster0.vxsqb.mongodb.net/`);


const userSchema = mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    profilepic:{
        type:String,
        default:'default.jpg'
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId, ref:'post'
        }
    ]
})


module.exports = mongoose.model('user',userSchema)