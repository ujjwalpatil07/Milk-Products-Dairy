import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dyahibuzy", // from .env
  api_key: "699989829952129",
  api_secret: "mIhjspCTTKwyc-rxMXWoWbWF3uE",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user-profiles", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 300, height: 300, crop: "limit" }],
  },
});

export const upload = multer({storage})

