import mongoose, { Schema } from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     image: {
//       type: String,
//       trim: true,
//     },

//     features: {
//       type: [String],
//       validate: [(arr) => arr.length <= 10, "Maximum 10 features allowed"],
//       default: [],
//     },

//     varieties: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Variety",
//         required: true,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Milk",
        "Curd (Dahi)",
        "Paneer",
        "Butter",
        "Ghee (Clarified Butter)",
        "Cheese",
        "Cream",
        "Buttermilk (Chaas)",
        "Lassi",
        "Flavored Milk",
        "Milk Powder",
        "Condensed Milk",
        "Khoa / Mawa",
        "Yogurt",
        "Ice Cream",
        "Shrikhand",
        "Whey Protein",
        "Dairy-Based Sweets (e.g., Rasgulla, Gulab Jamun, Kalakand)",
      ],
    },

    description: { type: String, trim: true },
    wishlisted: { type: Boolean, default: false },

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

// export default mongoose.model("Variety", VarietySchema);

export default mongoose.model("Product", ProductSchema);
