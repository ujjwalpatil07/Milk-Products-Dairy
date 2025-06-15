import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, length: { min: 5, max: 15 } },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  address: {
    streetAddress: { type: String },
    city: { type: String },
    pincode: { type: String }
  },
  shopName: {
    type: String
  },

  mobileNo: { type: String, length: { min: 5, max: 10 } },
  savedAddresses: [{ type: mongoose.Types.ObjectId, ref : "Address" }],
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
});


export default mongoose.model("User", UserSchema)