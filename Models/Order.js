import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  title: { type: String, require: true },
  price: { type: Number, require: true }, 
  qty: { type: Number, require: true },
  imgSrc: { type: String, require: true },
});    


const userShippingSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  address: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  country: { type: String, require: true },
  pincode: { type: String, require: true }, 
  phoneNumber: { type: String, require: true },
});      

  

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
 
  orderId:{
    type: String,
    require: true
  },
  paymentId:{
    type: String,
    require: true
  },
  signature:{
    type: String,
    require: true
  },
amount:{
  type:Number,
  require:true
},
paymentStatus:{
  type:Boolean,
  default: true,
},
  orderItems: [orderItemSchema],
  userShipping : userShippingSchema
});




export const Order = mongoose.model('Order',orderSchema)