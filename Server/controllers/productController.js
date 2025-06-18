import Product from "../models/ProductSchema.js";
import User from "../models/UserSchema.js";
import Review from "../models/ReviewSchema.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "Products fetch successfully",
    products: products,
  });
};

export const likeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.body.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  const alreadyLiked = product.likes.includes(userId);

  if (alreadyLiked) {
    return res
      .status(200)
      .json({ success: true, message: "Already liked this product." });
  }

  product.likes.push(userId);
  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product liked successfully.",
    updatedLikes: product.likes,
  });
};

export const getProductByName = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Product name is required." });
  }

  const product = await Product.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  }).populate({
    path: "reviews",
    populate: {
      path: "userId",
      select: "username photo",
    },
  });

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  res.status(200).json({ success: true, product });
};

export const productReviewLike = async (req, res) => {
  const { userId, productId, reviewId } = req.body;

  if (!userId || !productId || !reviewId) {
    return res.status(400).json({
      success: false,
      message: "userId, productId, and reviewId are required.",
    });
  }

  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  const review = product.reviews.find((r) => r._id.toString() === reviewId);

  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found." });
  }

  const alreadyLiked = review.likes.some((id) => id.toString() === userId);

  if (alreadyLiked) {
    return res.status(200).json({
      success: true,
      message: "You already liked this review.",
      likes: review.likes,
    });
  }

  review.likes.push(userId);
  await review.save();

  return res.status(200).json({
    success: true,
    message: "Review liked successfully.",
    likes: review.likes,
  });
};

export const addNewReview = async (req, res) => {
  const { productId, userId, message, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid productId." });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId." });
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Review message is required." });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  const newReview = await Review.create({
    userId,
    message: message.trim(),
    rating,
  });

  product.reviews.push(newReview._id);
  await product.save();

  return res.status(201).json({
    success: true,
    message: "Review added successfully.",
  });
};

export const editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { message, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ error: "Invalid review ID." });
  }

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  const review = await Review.findByIdAndUpdate(
    reviewId,
    {
      message: message.trim(),
      rating,
    },
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ error: "Review not found." });
  }

  return res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    review,
  });
};

export const deleteReview = async (req, res) => {
  const { reviewId, productId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(reviewId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ error: "Invalid reviewId or productId." });
  }

  const review = await Review.findByIdAndDelete(reviewId);

  if (!review) {
    return res.status(404).json({ error: "Review not found." });
  }

  await Product.findByIdAndUpdate(productId, {
    $pull: { reviews: reviewId },
  });

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
};
