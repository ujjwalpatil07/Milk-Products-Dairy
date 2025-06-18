import mongoose from "mongoose";
import Address from "../models/AddressShema.js";
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";

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
  try {
    const sampleProducts = [
      {
        name: "Cow Milk",
        description: `Cow Milk is one of the most widely consumed and nutritionally balanced beverages across the world. 
    It is naturally  rich in calcium, protein, and essential vitamins,  making it an excellent choice for individuals of all age groups.  
    Whether enjoyed on its own or used in a variety of recipes, cow milk provides  a wholesome source of energy and nutrients.
        Pasteurized cow milk undergoes a gentle heat treatment process to eliminate 
    `,
        category: "Milk",
        image: [
          "https://img.freepik.com/premium-photo/fresh-milk-glass-dark-wooden-table-blurred-landscape-with-cow-meadow-healthy-eating-rustic-style_91908-1026.jpg?uid=R201006356&ga=GA1.1.1259593858.1718175143&semt=ais_hybrid&w=740",
          "https://img.freepik.com/free-photo/cows-eating-lush-grass-green-field-front-fuji-mountain-japan_335224-36.jpg?uid=R201006356&ga=GA1.1.1259593858.1718175143&semt=ais_hybrid&w=740",
          "https://img.freepik.com/free-vector/vertical-poster-with-glass-milk-farm_1284-57915.jpg?uid=R201006356&ga=GA1.1.1259593858.1718175143&semt=ais_hybrid&w=740",
        ],
        minQuantity: 0.5,
        quantityUnit: "Liter",
        stock: 120,
        price: 50,
        nutrition: {
          calories: "65kcal/100ml",
          fat: "3.5g",
          protein: "3.2g",
          calcium: "120mg",
        },
        shelfLife: "2 Day's",
      },
      {
        name: "Buffalo Milk",
        description:
          "Thicker and creamier than cow milk, with higher fat content. Ideal for making curd, paneer, and sweets.",
        category: "Milk",
        image: [
          "https://img.freepik.com/free-vector/bottle-glass-milk_1284-14094.jpg?uid=R201006356&ga=GA1.1.1259593858.1718175143&semt=ais_hybrid&w=740",
        ],
        minQuantity: 1,
        quantityUnit: "Liter",
        stock: 80,
        price: 70,
        nutrition: {
          calories: "100kcal/100ml",
          fat: "7g",
          protein: "3.8g",
          calcium: "180mg",
        },
        shelfLife: "2 Day's",
      },
      {
        name: "Malai Paneer",
        description: "Organic paneer made from grass-fed cow milk.",
        category: "Paneer",
        image: [
          "https://media.istockphoto.com/id/1210307314/photo/homemade-indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-diced-in-a-wooden-bowl-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=lxl09yuBFdNixpBtfraw3FR9Z1TMzohRVTKj5nDcFdY=",
          "https://media.istockphoto.com/id/1054228718/photo/indian-sweets-in-a-plate-includes-gulab-jamun-rasgulla-kaju-katli-morichoor-bundi-laddu.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_eG_hiRCHa1evPiSHYauXWHVSQ5LZ893QrdAlKB_vE=",
        ],
        minQuantity: 0.2,
        quantityUnit: "Kg",
        rating: 4.6,
        stock: 70,
        price: 150,
        nutrition: {
          calories: "310kcal/100g",
          fat: "25g",
          protein: "15g",
          calcium: "180mg",
        },
      },
      {
        name: "Low-Fat Paneer",
        description: "Soft and fresh paneer, ideal for cooking.",
        category: "Paneer",
        image: [
          "https://media.istockphoto.com/id/1210307314/photo/homemade-indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-diced-in-a-wooden-bowl-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=lxl09yuBFdNixpBtfraw3FR9Z1TMzohRVTKj5nDcFdY=",
          "https://media.istockphoto.com/id/1054228718/photo/indian-sweets-in-a-plate-includes-gulab-jamun-rasgulla-kaju-katli-morichoor-bundi-laddu.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_eG_hiRCHa1evPiSHYauXWHVSQ5LZ893QrdAlKB_vE=",
        ],
        minQuantity: 0.2,
        quantityUnit: "Kg",
        rating: 4.2,
        stock: 80,
        price: 110,
        nutrition: {
          calories: "180kcal/100g",
          fat: "10g",
          protein: "20g",
          calcium: "220mg",
        },
      },
    ];

    const updatedProducts = await Product.insertMany(sampleProducts);

    console.log("Products inserted successfully")
    console.log(updatedProducts);
    
  } catch (error) {
    console.error("Error during DB initialization:", error);
  } finally {
    mongoose.disconnect();
  }
};
