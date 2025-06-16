import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, maxlength: 1000 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const VarietySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    description: { type: String, trim: true },

    image: {
      type: [String],
      validate: [arr => arr.length <= 3, "Maximum 3 images allowed"],
      default: [],
    },

    minQuantity: { type: Number, default: 1, min: 1 },

    quantityUnit: { type: String, required: true, enum: ["Liter", "Kg", "Gram", "Pack"] },

    type: { type: String, required: true },

    stock: { type: Number, default: 0, min: 0 },

    price: { type: Number, required: true, min: 0 },

    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],

    nutrition: {
      type: Map,
      of: String,
    },

    shelfLife: { type: String },

    reviews: [{ 
        type: Schema.Types.ObjectId,
        ref: "Review"
     }],
  },
  { timestamps: true }
);

export default mongoose.model("Variety", VarietySchema);
