const mongoose = require('mongoose');
const validator = require('validator');

//here we will store products in cart
//but for now i am only using true false to check if we need notification or not
const cartSchema = new mongoose.Schema({
   email: String,
   isNotification: {
    type:Boolean,
    default:false
   }
})


const cartModel = mongoose.model('carts', cartSchema);


module.exports = cartModel;