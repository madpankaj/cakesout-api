const mongoose = require('mongoose');

const ProductCategory = mongoose.model('ProductCategory',{
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        default:''
    }
    
}) 

module.exports = ProductCategory;