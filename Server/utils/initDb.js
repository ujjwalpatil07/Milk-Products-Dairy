import mongoose from "mongoose";
import Address from "../models/AddressShema.js";
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";
import Review from "../models/ReviewSchema.js"

const dbUrl =
  "mongodb+srv://ujjwalAndNitinDb:Tn99S9ZWR6oZjJOE@madhurdairy.5kjnxzp.mongodb.net/?retryWrites=true&w=majority&appName=MadhurDairy";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    initDB(); // only run after successful connection
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

const initDB = async () => {

  const reviews = [
    {
      userId: "683ab7a82eac450b11e88ad3",
      message: "Very sweet milk",
      rating: 5,
    },
    {
      userId: "683ab7a82eac450b11e88ad3",
      message: "Quality of cow milk is not that much good.",
      rating: 2,
    },
    {
      userId: "683ab7a82eac450b11e88ad3",
      message: "Nice product",
      rating: 4,
    },
  ];
  try {
    
    const reviews = await Review.find()

    const id = "6852555f41fdf8669cad1604";

    
    await Promise.all(
      reviews.map((review) =>
        Product.findByIdAndUpdate(id, {
          $push: { reviews: review._id },
        })
      )
    );

    const product = await Product.findById(id);

    console.log(product);

    
  } catch (error) {
    console.error("Error during DB initialization:", error);
  } finally {
    mongoose.disconnect();
  }
};
