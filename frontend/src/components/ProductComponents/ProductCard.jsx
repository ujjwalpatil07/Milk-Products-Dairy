
import React from "react";
import PropTypes from "prop-types";
import ProductVarietyCard from "./ProductVarietyCard";
import { getAverageRating } from "../../utils/averageRating";

export default function ProductCard({ product }) {

  return (
    <>
      <div className="py-3 mb-0 lg:px-6 w-full flex flex-col text-gray-800 dark:text-gray-200">
        <h1 className="text-blue-900 dark:text-white font-bold text-3xl">
          {product?.title}
        </h1>
        <p className="line-clamp-4">{product?.description}</p>

        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <a href={`#${product?.title}`}>
            Total Varieties: <strong>{product?.varieties?.length}</strong>
          </a>
        </div>
      </div>

      <div className="lg:px-6">
        {
          product?.varieties?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              No varieties available for this product.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5 border-b border-dashed border-gray-500/50">
              {
                product?.varieties?.map((productVariety, idx) => (
                  <ProductVarietyCard
                    key={idx * 0.87}
                    image={productVariety?.image?.[0] || ""}
                    name={productVariety?.name}
                    rating={getAverageRating(productVariety?.reviews)}
                    likes={productVariety?.likes}
                    type={productVariety?.type}
                    price={productVariety?.price}
                    minQuantity={productVariety?.minQuantity}
                    stock={productVariety?.stock}
                    quantityUnit={productVariety?.quantityUnit}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    varieties: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};