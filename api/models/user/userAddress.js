const mongoose = require('mongoose');
const UserAddress = mongoose.model('UserAddress',{
    user_id:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    addressType:{
        type:String,
        default:'Home'
    },
    isDefault:{
        default:false,
        type:String,
        required:true
    }
})

module.exports = UserAddress;