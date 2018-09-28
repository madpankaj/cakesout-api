const mongoose = require('mongoose');

const ProductAttribute = mongoose.model('ProductAttribute',({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
}));

module.exports = ProductAttribute ;