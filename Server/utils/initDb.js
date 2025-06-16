import mongoose from "mongoose";
import Address from "../models/AddressShema.js"
import User from "../models/UserSchema.js";


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

const demoAddresses = [
  {
    owner: "683ab7a82eac450b11e88ad3",
    addressType: "Home",
    name: "Ujjwal Patil",
    phone: "9876543210",
    streetAddress: "123 MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  },
  {
    owner: "683ab7a82eac450b11e88ad3",
    addressType: "Work",
    name: "Shilesh Thakre",
    phone: "9876543210",
    streetAddress: "456 Tech Park, Sector 5",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560103",
  },
  {
    owner: "683ab7a82eac450b11e88ad3",
    addressType: "Other",
    name: "Nitin Gayke",
    phone: "9876543210",
    streetAddress: "B-7, Green Valley Apartments",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110065",
  },
];

const initDB = async () => {
  try {
    const ownerId = "683ab7a82eac450b11e88ad3";
    await Address.insertMany(demoAddresses);

    
    console.log("Addresses inserted successfully");

    const addresses = await Address.find({ owner: "683ab7a82eac450b11e88ad3" });

    addresses.map(async (address) => {
      await User.findByIdAndUpdate(ownerId, {
        $push : {savedAddresses : address._id}
      })
    })

    const owner = await User.findById(ownerId)
    console.log(owner);

  } catch (error) {
    console.error("Error during DB initialization:", error);
  } finally {
    mongoose.disconnect();
  }
};

