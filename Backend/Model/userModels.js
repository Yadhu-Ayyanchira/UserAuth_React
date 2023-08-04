const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    email:{
        type: String,
        required : true
        },
        mob:{
            type:Number
        },
        password:{
            type:String,
            required:true
        },
        is_admin:{
            type:Boolean,
            required:true
        },
        image:{
            type:String,
            default:''
        }
})

const user=mongoose.model('User',userSchema)
module.exports=user