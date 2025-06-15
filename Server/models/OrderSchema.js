import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  
  owner : {type : mongoose.Types.ObjectId, ref : "User"},
  status : {type : String, enum : ["Shipped", "Confirmed", "Out of delivary", "Delivered"]},
  paymentMode : {type : String, enum : ["Cash on Delivery", "Online"]},
  invoice : {type : mongoose.Types.ObjectId, ref : "Invoice"},
})

export default mongoose.model("Order", OrderSchema)