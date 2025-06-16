import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    features: {
      type: [String],
      validate: [(arr) => arr.length <= 10, "Maximum 10 features allowed"],
      default: [],
    },

    varieties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variety",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
