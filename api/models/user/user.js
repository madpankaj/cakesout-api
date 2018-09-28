const mongoose = require('mongoose');

const User = mongoose.model('User',({
    username:{
        type:String,
        trim:true,
        default:''
       
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    mobile_no:{
        type:Number,
        trim:true,
        maxlength:10,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        default:''
    },
    profilePic:{
        type:String,
        default:''
    }
    
}));

module.exports =  User 