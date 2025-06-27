import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 5,
      max: 15,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      min: [8, "Password must be at lest 8 characters"],
      max: [20, "Password too long, please enter less than 20 characters"],
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    photo: {
      type: String,
      default: "",
    },

    address: {
      streetAddress: { type: String },
      city: { type: String },
      pincode: { type: String },
    },

    shopName: {
      type: String,
    },

    mobileNo: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    savedAddresses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Address",
      },
    ],

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    wishlistedProducts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    notifications: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
