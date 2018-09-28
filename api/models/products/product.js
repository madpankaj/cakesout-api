const mongoose = require('mongoose');

const Product = mongoose.model('Product',({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productImage:{
        type:String
    },
    productData:{
        type:Array
    }
    
}))

module.exports = Product ;