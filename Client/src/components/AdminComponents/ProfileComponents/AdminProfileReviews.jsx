import React from "react";
import { Star, MessageCircle } from "lucide-react";

const customerReviews = [
  {
    id: 1,
    customerName: "Rahul Sharma",
    rating: 5,
    message: "The milk quality is top-notch! Always fresh and delivered on time.",
    date: "2025-06-01T14:35:00Z",
    product: "Cow Milk"
  },
  {
    id: 2,
    customerName: "Sneha Patil",
    rating: 4,
    message: "Great paneer quality but would love faster delivery in peak hours.",
    date: "2025-06-18T10:12:00Z",
    product: "Paneer"
  },
  {
    id: 3,
    customerName: "Amit Joshi",
    rating: 3,
    message: "Lassi was good but bottle packaging can be improved.",
    date: "2025-06-20T08:50:00Z",
    product: "Lassi"
  }
];

export default function AdminProfileReviews() {
  return (
    <div className="bg-white dark:bg-gray-500/20 p-5 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
        <MessageCircle className="text-purple-600" />
        Customer Reviews
      </h2>

      {customerReviews.map((review) => (
        <div
          key={review.id}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium text-gray-800 dark:text-white">
              {review.customerName}
              <span className="ml-2 text-sm text-gray-500">
                ({review.product})
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < review.rating ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            "{review.message}"
          </p>

          <div className="text-xs text-gray-400 mt-2">
            {new Date(review.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
