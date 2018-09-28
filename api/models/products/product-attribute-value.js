const mongoose = require('mongoose');

const ProductAttributeValue = mongoose.model('ProductAttributeValue',({
    attribute_id:{
        type:String,
        required:true
    },
    value:{
        type:Array,
        required:true
    }
}));

module.exports = ProductAttributeValue ;