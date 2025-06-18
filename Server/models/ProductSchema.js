import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, default: "Milk" },

    description: { type: String },

    image: {
      type: [String],
      validate: [(arr) => arr.length <= 3, "Maximum 3 images allowed"],
      default: [],
    },

    minQuantity: { type: Number, default: 1 },

    quantityUnit: {
      type: String,
      required: true,
      enum: ["Liter", "Kg", "Gram", "Pack"],
    },

    stock: { type: Number, default: 0, min: 0 },

    price: { type: Number, required: true, min: 0 },

    type: { type: String },
    
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],

    nutrition: {
      type: Map,
      of: String,
    },

    shelfLife: { type: String },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
